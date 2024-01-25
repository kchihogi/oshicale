from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import json
from uuid import uuid4

from .test_api import Utils

class ArtistUtils():
    def __init__(self, test):
        self.test = test

    def create_artist(self):
        # Create a artist
        name = 'Artist' + str(uuid4())
        description = 'Artist description for ' + name
        url = reverse('artist-list')
        data = {'name': name, 'description': description}
        response = self.test.client.post(url, data, format='json')
        if response.status_code != status.HTTP_201_CREATED:
            print(response.data)
            raise Exception('Failed to create artist')
        return name, description

class ArtistTests(APITestCase):
    def test_list_artists(self):
        """
        Ensure we can list artists.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('count', content)
        self.assertIn('next', content)
        self.assertIn('previous', content)
        self.assertIn('results', content)
        self.assertGreater(len(content['results']), 0)
        first_artist = content['results'][0]
        self.assertIn('id', first_artist)
        self.assertIn('href', first_artist)
        self.assertIn('name', first_artist)
        self.assertIn('description', first_artist)
        self.assertIn('artist_events', first_artist)

    def test_retrieve_artist(self):
        """
        Ensure we can retrieve a artist.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('artist-detail', args=[id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('description', content)
        self.assertIn('artist_events', content)

    def test_list_artists_without_token_can_list(self):
        """
        Ensure we can list artists without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('artist-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('count', content)
        self.assertIn('next', content)
        self.assertIn('previous', content)
        self.assertIn('results', content)
        self.assertGreater(len(content['results']), 0)
        first_artist = content['results'][0]
        self.assertIn('id', first_artist)
        self.assertIn('href', first_artist)
        self.assertIn('name', first_artist)
        self.assertIn('description', first_artist)
        self.assertIn('artist_events', first_artist)

    def test_retrieve_artist_without_token_can_retrieve(self):
        """
        Ensure we can retrieve a artist without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('artist-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('artist-detail', args=[id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('description', content)
        self.assertIn('artist_events', content)

    def test_create_artist(self):
        """
        Ensure we can create a new artist object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('artist-list')
        data = {'name': 'Artist', 'description': 'Artist description'}
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('description', content)
        self.assertIn('artist_events', content)
        self.assertEqual(content['name'], data['name'])
        self.assertEqual(content['description'], data['description'])

    def test_create_artist_duplicate(self):
        """
        Ensure we cant create a duplicate artist object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('artist-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        data = {'name': 'Artist', 'description': 'Artist description'}

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)

    def test_create_artist_unauthorized(self):
        """
        Ensure we can't create a new artist object without a token.
        """

        url = reverse('artist-list')
        data = {'name': 'Artist', 'description': 'Artist description'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg=response.data)

    def test_update_artist(self):
        """
        Ensure we can update a artist object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list')
        response = self.client.get(url, format='json')
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('artist-detail', args=[id])
        data = {'name': 'updated_' + name, 'description': 'updated_' + description}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('description', content)
        self.assertIn('artist_events', content)
        self.assertEqual(content['name'], data['name'])
        self.assertEqual(content['description'], data['description'])

    def test_update_artist_unauthorized(self):
        """
        Ensure we can't update a artist object without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('artist-list')
        data = {'name': 'updated_' + name, 'description': 'updated_' + description}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg=response.data)

    def test_partial_update_artist(self):
        """
        Ensure we can partial update a artist object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list')
        response = self.client.get(url, format='json')
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('artist-detail', args=[id])
        data = {'name': 'updated_' + name}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('id', content)
        self.assertIn('href', content)
        self.assertIn('name', content)
        self.assertIn('description', content)
        self.assertIn('artist_events', content)
        self.assertEqual(content['name'], data['name'])
        self.assertEqual(content['description'], description)

    def test_partial_update_artist_unauthorized(self):
        """
        Ensure we can't partial update a artist object without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('artist-list')
        data = {'name': 'updated_' + name}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg=response.data)

    def test_delete_artist(self):
        """
        Ensure we can delete a artist object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list')
        response = self.client.get(url, format='json')
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('artist-detail', args=[id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT, msg=response.data)

    def test_delete_artist_unauthorized(self):
        """
        Ensure we can't delete a artist object without a token.
        """

        #create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()
        self.client.credentials(HTTP_AUTHORIZATION='')

        url = reverse('artist-list')
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, msg=response.data)

    def test_list_artists_filter_name(self):
        """
        Ensure we can list artists with a name filter.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list') + '?name=' + name
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        first_artist = content['results'][0]
        self.assertEqual(first_artist['name'], name)

    def test_list_artists_filter_description(self):
        """
        Ensure we can list artists with a description filter.
        """
        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list') + '?description=' + description
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        first_artist = content['results'][0]
        self.assertEqual(first_artist['description'], description)

    def test_list_artists_filter_name_and_description(self):
        """
        Ensure we can list artists with a name and description filter.
        """
        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list') + '?name=' + name + '&description=' + description
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        first_artist = content['results'][0]
        self.assertEqual(first_artist['name'], name)
        self.assertEqual(first_artist['description'], description)

    def test_list_artists_filter_name_and_description_no_match(self):
        """
        Ensure we can list artists with a name and description filter.
        """
        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list') + '?name=nomatch&description=nomatch'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(len(content['results']), 0)

    def test_list_artists_filter_name_and_description_partial_match(self):
        """
        Ensure we can list artists with a name and description filter.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        #create a artist
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        name, description = ArtistUtils(self).create_artist()

        url = reverse('artist-list') + '?name=' + name + '&description=nomatch'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(len(content['results']), 0)
