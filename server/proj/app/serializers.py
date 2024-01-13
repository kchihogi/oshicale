""" Serializers for the app models. """
from django.contrib.auth.models import Group, User
from rest_framework import serializers

from .models import (
    Artist,
    Event,
)

class SignupSerializer(serializers.HyperlinkedModelSerializer):
    """ Serializer for the signup view. """

    id = serializers.IntegerField(read_only=True)
    change_password = serializers.BooleanField(write_only=True, default=False)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'change_password']
        extra_kwargs = {'password': {'write_only': True}, 'change_password': {'write_only': True}}

    def create(self, validated_data):
        """ Create a new user. """
        user = User.objects.create_user(
            validated_data.get('username'),
            validated_data.get('email'),
            validated_data.get('password')
        )
        return user

    def update(self, instance, validated_data):
        """ Update a user. and change password if requested. """
        if validated_data.get('change_password'):
            instance.set_password(validated_data.get('password'))
        else:
            instance.username = validated_data.get('username', instance.username)
            instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance

class UserSerializer(serializers.HyperlinkedModelSerializer):
    """ Serializer for the user model. """

    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'href', 'username', 'email', 'groups']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """ Serializer for the group model. """

    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Group
        fields = ['id', 'href', 'name']

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    """ Serializer for the artist model. """

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Artist
        fields = ['id', 'href', 'name', 'description', 'artist_events']

class EventSerializer(serializers.HyperlinkedModelSerializer):
    """ Serializer for the event model. """

    id = serializers.IntegerField(read_only=True)
    owner = serializers.ReadOnlyField(source='owner.username')
    artist = ArtistSerializer(read_only=True)
    artist_id = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all(), source='artist', write_only=True, allow_null=True)

    class Meta:
        model = Event
        fields = ['id', 'href', 'name', 'date', 'location', 'description', 'public', 'owner', 'artist', 'artist_id']
