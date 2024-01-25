from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from uuid import uuid4

from django.contrib.auth.models import User

class Utils():
    def __init__(self, test):
        self.test = test

    def create_superuser(self):
        # Create a superuser
        name = 'Administrator' + str(uuid4())
        email = 'admin@example.com'
        password = 'dummy_pass'
        User.objects.create_superuser(name, email, password)
        return name, email, password

    def create_superuser_token(self):
        name, email, password = self.create_superuser()
        url = reverse('token_obtain_pair')
        data = {'username': name, 'password': password}
        response = self.test.client.post(url, data, format='json')
        return response.data['access'], response.data['refresh']

    def create_user(self):
        # Create a user
        name = 'User' + str(uuid4())
        email = 'user@example.com'
        password = 'dummy_pass'
        url = reverse('signup-list')
        data = {'username': name, 'email': email, 'password': password}
        response = self.test.client.post(url, data, format='json')
        if response.status_code != status.HTTP_201_CREATED:
            print(response.data)
            raise Exception('Failed to create user')
        return name, email, password

    def create_user_token(self):
        name, email, password = self.create_user()
        url = reverse('token_obtain_pair')
        data = {'username': name, 'password': password}
        response = self.test.client.post(url, data, format='json')
        return response.data['access'], response.data['refresh']

    def login(self, name, password):
        url = reverse('token_obtain_pair')
        data = {'username': name, 'password': password}
        response = self.test.client.post(url, data, format='json')
        return response.data['access'], response.data['refresh']

class ApiTests(APITestCase):
    def test_token_create(self):
        """
        Ensure we can create a new token object.
        """

        # Create a superuser
        name, email, password = Utils(self).create_superuser()

        url = reverse('token_obtain_pair')
        data = {'username': name, 'password': password}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
        self.assertTrue(response.data['access'])
        self.assertTrue(response.data['refresh'])

    def test_token_refresh(self):
        """
        Ensure we can refresh a token object.
        """

        # Create a superuser
        access, refresh = Utils(self).create_superuser_token()

        url = reverse('token_refresh')
        data = {'refresh': refresh}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK, msg=response.data)
        self.assertIn('access', response.data)
        self.assertTrue(response.data['access'])
        self.assertNotEqual(access, response.data['access'])
