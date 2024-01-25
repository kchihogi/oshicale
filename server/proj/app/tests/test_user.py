from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import json

from .test_api import Utils

class UserTests(APITestCase):
    def test_list_users(self):
        """
        Ensure we can list users.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('user-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('count', content)
        self.assertIn('next', content)
        self.assertIn('previous', content)
        self.assertIn('results', content)
        self.assertGreater(len(content['results']), 0)
        first_user = content['results'][0]
        self.assertIn('username', first_user)
        self.assertIn('email', first_user)
        self.assertIn('groups', first_user)
        self.assertIn('href', first_user)
        self.assertIn('id', first_user)

    def test_retrieve_user(self):
        """
        Ensure we can retrieve a user.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('user-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        url = content['results'][0]['href']
        id = content['results'][0]['id']
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('username', content)
        self.assertIn('email', content)
        self.assertIn('groups', content)
        self.assertIn('href', content)
        self.assertIn('id', content)
        self.assertEqual(content['id'], id)

    def test_list_users_unauthorized(self):
        """
        Ensure we can't list users.
        """
        
        #create a user
        access, refresh = Utils(self).create_user_token()

        url = reverse('user-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('detail', content)

    def test_retrieve_user_unauthorized(self):
        """
        Ensure we can't retrieve a user.
        """

        # Create a user
        access, refresh = Utils(self).create_user_token()

        url = reverse('user-detail', args=[1])
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('detail', content)

    def test_unsupported_methods(self):
        """
        Ensure unsupported methods are not allowed.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('user-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.put(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED, msg=response.data)
        response = self.client.patch(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED, msg=response.data)
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED, msg=response.data)
        url = reverse('user-detail', args=[1])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED, msg=response.data)
        response = self.client.put(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED, msg=response.data)
        response = self.client.patch(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED, msg=response.data)
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED, msg=response.data)
