from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import json
from uuid import uuid4

from .test_api import Utils

class EnvetUtils():
    def __init__(self, test):
        self.test = test

    def create_event(self):
        # Create an envet
        name = 'Event' + str(uuid4())
        date = '2024-01-01T09:00:00+09:00'
        location = 'Event location for ' + name
        description = 'Event description for ' + name
        public = 1
        artist_id = None
        url = reverse('event-list')
        data = {'name': name, 'date': date, 'location': location, 'description': description, 'public': public, 'artist_id': artist_id}
        response = self.test.client.post(url, data, format='json')
        if response.status_code != status.HTTP_201_CREATED:
            print(response.data)
            raise Exception('Failed to create event')
        return name, date, location, description, public
    
    def create_private_event(self):
        # Create an envet
        name = 'Event' + str(uuid4())
        date = '2024-01-01T09:00:00+09:00'
        location = 'Event location for ' + name
        description = 'Event description for ' + name
        public = 0
        artist_id = None
        url = reverse('event-list')
        data = {'name': name, 'date': date, 'location': location, 'description': description, 'public': public, 'artist_id': artist_id}
        response = self.test.client.post(url, data, format='json')
        if response.status_code != status.HTTP_201_CREATED:
            print(response.data)
            raise Exception('Failed to create event')
        return name, date, location, description, public

class EventTests(APITestCase):
    def test_list_events(self):
        """
        Ensure we can list evnets.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('count', content)
        self.assertIn('next', content)
        self.assertIn('previous', content)
        self.assertIn('results', content)
        self.assertGreater(len(content['results']), 0)
        first_event = content['results'][0]
        self.assertIn('id', first_event)
        self.assertIn('href', first_event)
        self.assertIn('name', first_event)
        self.assertIn('date', first_event)
        self.assertIn('location', first_event)
        self.assertIn('description', first_event)
        self.assertIn('public', first_event)
        self.assertIn('owner', first_event)
        self.assertIn('artist', first_event)

    def test_retrieve_event(self):
        """
        Ensure we can retrieve an event.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('event-detail', args=[id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('date', content)
        self.assertIn('location', content)
        self.assertIn('description', content)
        self.assertIn('public', content)
        self.assertIn('owner', content)
        self.assertIn('artist', content)

    def test_list_events_without_token_can_list(self):
        """
        Ensure we can list events without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('count', content)
        self.assertIn('next', content)
        self.assertIn('previous', content)
        self.assertIn('results', content)
        self.assertGreater(len(content['results']), 0)
        first_event = content['results'][0]
        self.assertIn('id', first_event)
        self.assertIn('href', first_event)
        self.assertIn('name', first_event)
        self.assertIn('date', first_event)
        self.assertIn('location', first_event)
        self.assertIn('description', first_event)
        self.assertIn('public', first_event)
        self.assertIn('owner', first_event)
        self.assertIn('artist', first_event)

    def test_retrieve_event_without_token_can_retrieve(self):
        """
        Ensure we can retrieve an event without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('event-detail', args=[id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('date', content)
        self.assertIn('location', content)
        self.assertIn('description', content)
        self.assertIn('public', content)
        self.assertIn('owner', content)
        self.assertIn('artist', content)

    def test_create_event(self):
        """
        Ensure we can create a new event object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('event-list')
        data = {'name': 'Event', 'date': '2024-01-01T09:00:00+09:00', 'location': 'Event location', 'description': 'Event description', 'public': 1, 'artist_id': None}
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('date', content)
        self.assertIn('location', content)
        self.assertIn('description', content)
        self.assertIn('public', content)
        self.assertIn('owner', content)
        self.assertIn('artist', content)

    def test_create_event_duplicate(self):
        """
        Ensure we cant create a duplicate event object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('event-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        data = {'name': 'Event', 'date': '2024-01-01T09:00:00+09:00', 'location': 'Event location', 'description': 'Event description', 'public': 1, 'artist_id': None}

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)

    def test_create_event_unauthorized(self):
        """
        Ensure we can't create a new event object without a token.
        """

        url = reverse('event-list')
        data = {'name': 'Event', 'date': '2024-01-01T09:00:00+09:00', 'location': 'Event location', 'description': 'Event description', 'public': 1, 'artist_id': None}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg=response.data)

    def test_update_event(self):
        """
        Ensure we can update an event object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('event-detail', args=[id])
        data = {'name': 'updated_' + name, 'date': '2024-12-31T09:00:00+09:00', 'location': 'updated_' + location, 'description': 'updated_' + description, 'public': 1, 'artist_id': None}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('date', content)
        self.assertIn('location', content)
        self.assertIn('description', content)
        self.assertIn('public', content)
        self.assertIn('owner', content)
        self.assertIn('artist', content)
        self.assertEqual(content['name'], data['name'])
        self.assertEqual(content['date'], data['date'])
        self.assertEqual(content['location'], data['location'])
        self.assertEqual(content['description'], data['description'])
        self.assertEqual(content['public'], data['public'])

    def test_update_event_unauthorized(self):
        """
        Ensure we can't update an event object without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('event-list')
        data = {'name': 'updated_' + name, 'date': '2024-12-31T09:00:00+09:00', 'location': 'updated_' + location, 'description': 'updated_' + description, 'public': 1, 'artist_id': None}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg=response.data)

    def test_partial_update_event(self):
        """
        Ensure we can partial update an event object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('event-detail', args=[id])
        data = {'name': 'updated_' + name}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('date', content)
        self.assertIn('location', content)
        self.assertIn('description', content)
        self.assertIn('public', content)
        self.assertIn('owner', content)
        self.assertIn('artist', content)
        self.assertEqual(content['name'], data['name'])
        self.assertEqual(content['date'], date)
        self.assertEqual(content['location'], location)
        self.assertEqual(content['description'], description)
        self.assertEqual(content['public'], public)

    def test_partial_update_envet_unauthorized(self):
        """
        Ensure we can't partial update an event object without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('event-list')
        data = {'name': 'updated_' + name}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg=response.data)

    def test_delete_event(self):
        """
        Ensure we can delete an event object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('event-detail', args=[id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT, msg=response.data)

    def test_delete_event_unauthorized(self):
        """
        Ensure we can't delete an event object without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('event-list')
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg=response.data)

    def test_list_events_filter_name(self):
        """
        Ensure we can list events with a name filter.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()

        url = reverse('event-list') + '?name=' + name
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        first_event = content['results'][0]
        self.assertEqual(first_event['name'], name)

    def test_list_events_filter_public(self):
        """
        Ensure we can list events with a public filter.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_event()

        url = reverse('event-list') + '?public=' + str(public)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        first_event = content['results'][0]
        self.assertEqual(first_event['public'], public)

    def test_list_events_filter_private(self):
        """
        Ensure we can list events with a private filter.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_private_event()

        url = reverse('event-list') + '?public=' + str(public)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(len(content['results']), 1)
        first_event = content['results'][0]
        self.assertEqual(first_event['public'], public)

    def test_list_events_filter_public_and_private(self):
        """
        Ensure we can list events with a public filter and private events are not shown.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name1, date1, location1, description1, public1 = EnvetUtils(self).create_event()
        name2, date2, location2, description2, public2 = EnvetUtils(self).create_private_event()

        url = reverse('event-list') + '?public=' + str(public1)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(len(content['results']), 1)
        first_event = content['results'][0]
        self.assertEqual(first_event['public'], public1)

    def test_list_events_filter_public_and_private_without_param(self):
        """
        Ensure we can list events with a public filter and private events are shown.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name1, date1, location1, description1, public1 = EnvetUtils(self).create_event()
        name2, date2, location2, description2, public2 = EnvetUtils(self).create_private_event()

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(len(content['results']), 2)
        first_event = content['results'][0]
        self.assertEqual(first_event['public'], public1)
        second_event = content['results'][1]
        self.assertEqual(second_event['public'], public2)

    def test_list_events_filter_public_and_private_without_param_by_user(self):
        """
        Ensure we can list events with a public filter and private events are shown.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create an event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name1, date1, location1, description1, public1 = EnvetUtils(self).create_event()
        name2, date2, location2, description2, public2 = EnvetUtils(self).create_private_event()

        #create a user
        access, refresh = Utils(self).create_user_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(len(content['results']), 1)
        first_event = content['results'][0]
        self.assertEqual(first_event['public'], public1)

    def test_retrieve_private_event_by_user(self):
        """
        Ensure we can not retrieve a private event by a user.
        """
            
        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a private event
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, date, location, description, public = EnvetUtils(self).create_private_event()

        url = reverse('event-list')
        response = self.client.get(url, format='json')
        content = json.loads(response.content)
        id = content['results'][0]['id']
        self.assertEqual(content['results'][0]['public'], 0)

        #create a user
        access, refresh = Utils(self).create_user_token()
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)

        url = reverse('event-detail', args=[id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND, msg=response.data)
