""" URL Configuration for app """
from django.urls import include, path
from rest_framework import routers

from app import views
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'groups', views.GroupViewSet, basename='group')
router.register(r'events', views.EventViewSet, basename='event')
router.register(r'signup', views.SignupViewSet, basename='signup')

urlpatterns = [
    path('', include(router.urls)),
]
