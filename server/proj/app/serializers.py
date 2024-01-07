from rest_framework import serializers
from django.contrib.auth.models import Group, User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'href', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Group
        fields = ['id', 'href', 'name']
