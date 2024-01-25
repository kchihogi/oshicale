from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import json
from uuid import uuid4

from .test_api import Utils

class SignupTests(APITestCase):
    def test_list_signup(self):
        """
        Ensure we can list signup.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('count', content)
        self.assertIn('next', content)
        self.assertIn('previous', content)
        self.assertIn('results', content)
        self.assertGreater(len(content['results']), 0)
        first_signup = content['results'][0]
        self.assertIn('username', first_signup)
        self.assertIn('email', first_signup)
        self.assertIn('id', first_signup)

    def test_retrieve_signup(self):
        """
        Ensure we can retrieve a signup.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        id = content['results'][0]['id']
        url = reverse('signup-detail', args=[id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('username', content)
        self.assertIn('email', content)
        self.assertIn('id', content)
        self.assertEqual(content['id'], id)

    def test_list_signup_unauthorized(self):
        """
        Ensure we can't list signup.
        """
        
        #create a user
        access, refresh = Utils(self).create_user_token()

        url = reverse('signup-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('detail', content)

    def test_retrieve_signup_unauthorized(self):
        """
        Ensure we can't retrieve a signup.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertGreater(len(content['results']), 0)
        first_signup = content['results'][0]

        # Create a user
        access, refresh = Utils(self).create_user_token()

        url = reverse('signup-detail', args=[first_signup['id']])
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('detail', content)

    def test_create_signup(self):
        """
        Ensure we can create a signup object.
        """

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        self.assertIn('username', content)
        self.assertIn('email', content)
        self.assertIn('id', content)
        self.assertEqual(content['username'], data['username'])
        self.assertEqual(content['email'], data['email'])

    def test_create_signup_duplicate(self):
        """
        Ensure we can't create a duplicate signup object.
        """

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST, msg=response.data)

    def test_create_signup_unauthorized(self):
        # Crating a signup is allowed for anyone
        pass

    def test_update_signup(self):
        """
        Ensure we can update a signup object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id = content['id']
        url = reverse('signup-detail', args=[id])
        data['username'] = 'updated_' + data['username']
        data['email'] = 'updated_' + data['email']
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(content['username'], data['username'])
        self.assertEqual(content['email'], data['email'])

    def test_update_signup_password(self):
        """
        Ensure we can update a signup object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id = content['id']
        url = reverse('signup-detail', args=[id])
        data['password'] = 'updated_' + data['password']
        data['change_password'] = True
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)

    def test_update_signup_user_can_update_self_but_not_others(self):
        """
        Ensure we can update a signup object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }
        data2 = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id = content['id']
        response = self.client.post(url, data2, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id2 = content['id']

        # Create a user
        access, refresh = Utils(self).login(data['username'], data['password'])

        url = reverse('signup-detail', args=[id])
        data['username'] = 'updated_' + data['username']
        data['email'] = 'updated_' + data['email']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(content['username'], data['username'])
        self.assertEqual(content['email'], data['email'])

        url = reverse('signup-detail', args=[id2])
        data2['username'] = 'updated_' + data2['username']
        data2['email'] = 'updated_' + data2['email']
        response = self.client.put(url, data2, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN, msg=response.data)

    def test_partial_update_signup(self):
        """
        Ensure we can partial update a signup object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id = content['id']
        url = reverse('signup-detail', args=[id])
        partial_data = {
            "email": "updated_" + data['email'],
        }
        response = self.client.patch(url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(content['username'], data['username'])
        self.assertEqual(content['email'], partial_data['email'])

    def test_partial_update_signup_password(self):
        """
        Ensure we can partial update a signup object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id = content['id']
        url = reverse('signup-detail', args=[id])
        partial_data = {
            "password": "updated_" + data['password'],
            "change_password": True
        }
        response = self.client.patch(url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)

    def test_partial_update_signup_user_can_partial_update_self_but_not_others(self):
        """
        Ensure we can partial update a signup object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        data2 = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id = content['id']
        response = self.client.post(url, data2, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id2 = content['id']

        # Create a user
        access, refresh = Utils(self).login(data['username'], data['password'])

        url = reverse('signup-detail', args=[id])
        partial_data = {
            "email": "updated_" + data['email'],
        }
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.patch(url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        content = json.loads(response.content)
        self.assertEqual(content['username'], data['username'])
        self.assertEqual(content['email'], partial_data['email'])

        url = reverse('signup-detail', args=[id2])
        partial_data = {
            "email": "updated_" + data2['email'],
        }
        response = self.client.patch(url, partial_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN, msg=response.data)

    def test_delete_signup(self):
        """
        Ensure we can delete a signup object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id = content['id']
        url = reverse('signup-detail', args=[id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT, msg=response.data)

    def test_delete_signup_user_can_delete_self_but_not_others(self):
        """
        Ensure we can delete a signup object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('signup-list')
        data = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }
        data2 = {
            "username": "user" + str(uuid4()),
            "email": "user@example.com",
            "password": "dummy_pass",
            "change_password": False
        }

        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id = content['id']
        response = self.client.post(url, data2, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)
        content = json.loads(response.content)
        id2 = content['id']

        # Create a user
        access, refresh = Utils(self).login(data['username'], data['password'])

        url = reverse('signup-detail', args=[id2])
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + access)
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN, msg=response.data)

        url = reverse('signup-detail', args=[id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT, msg=response.data)
