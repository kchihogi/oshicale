""" API views for the app. """
import datetime
from django.contrib.auth.models import Group, User
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from rest_framework import permissions, viewsets
from .permissions import IsOwnerOrReadOnly, IsStaffOrOwner

from .serializers import (
    ArtistSerializer,
    GroupSerializer,
    EventSerializer,
    SignupSerializer,
    UserSerializer,
)

from .models import (
    Artist,
    Event,
)

class BaseModelViewSet(viewsets.ModelViewSet):
    """
    Base ViewSet for viewing and editing models.
    """
    permission_classes = [IsOwnerOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = None
        return context

class BaseReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Base ViewSet for viewing models.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = None
        return context

@extend_schema_view(
    list=extend_schema(summary='List all users', description='Listing all users is only allowed for admins.'),
    create=extend_schema(summary='Create a new user', description='Creating a new user is allowed for anyone.'),
    retrieve=extend_schema(summary='Retrieve a user', description='Retrieving a user is only allowed for staff or the user itself.'),
    partial_update=extend_schema(summary='Partially update a user', description='Partially updating a user is only allowed for staff or the user itself.'),
    destroy=extend_schema(summary='Delete a user', description='Deleting a user is only allowed for staff or the user itself.'),
)
class SignupViewSet(BaseModelViewSet):
    """
    ViewSet for signing up new users.
    """
    queryset = User.objects.all()
    serializer_class = SignupSerializer

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.IsAdminUser]
        elif self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsStaffOrOwner]
        return [permission() for permission in permission_classes]

@extend_schema_view(
    list=extend_schema(summary='List all users', description='Listing all users is only allowed for admins.'),
    retrieve=extend_schema(summary='Retrieve a user', description='Retrieving a user is only allowed for admins.'),
)
class UserViewSet(BaseReadOnlyModelViewSet):
    """
    ViewSet for viewing users.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

@extend_schema_view(
    list=extend_schema(summary='List all groups', description='Listing all groups is only allowed for admins.'),
    retrieve=extend_schema(summary='Retrieve a group', description='Retrieving a group is only allowed for admins.'),
)
class GroupViewSet(BaseReadOnlyModelViewSet):
    """
    ViewSet for viewing groups.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAdminUser]

@extend_schema_view(
    list=extend_schema(summary='List all events', description='Listing all events is allowed for authenticated users.',
        parameters=[
            OpenApiParameter(name='name', description='Filter by name', required=False, type=str),
            OpenApiParameter(name='from', description='Filter by date', required=False, type=OpenApiTypes.DATE, location=OpenApiParameter.QUERY,
                examples=[
                    OpenApiExample(
                        'One week ago',
                        summary='One week ago',
                        description='One week ago',
                        value=(datetime.datetime.now() - datetime.timedelta(days=7)).strftime('%Y-%m-%dT%H:%M:%S.%f+09:00')
                    ),
                ],
            ),
            OpenApiParameter(name='to', description='Filter by date', required=False, type=OpenApiTypes.DATE, location=OpenApiParameter.QUERY,
                examples=[
                    OpenApiExample(
                        'Today',
                        summary='Today',
                        description='Today',
                        value=datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%f+09:00')
                    ),
                ],
            ),
            OpenApiParameter(name='public', description='Filter by public', required=False, type=int, location=OpenApiParameter.QUERY,
                examples=[
                    OpenApiExample(
                        'Public',
                        summary='Public',
                        description='Public',
                        value=1
                    ),
                    OpenApiExample(
                        'Private',
                        summary='Private',
                        description='Private',
                        value=0
                    ),
                ],
            ),
            OpenApiParameter(name='owner', description='Filter by owner', required=False, type=str),
        ]
    ),
    create=extend_schema(summary='Create a new event', description='Creating a new event is allowed for authenticated users.'),
    retrieve=extend_schema(summary='Retrieve an event', description='Retrieving an event is allowed for authenticated users.'),
    partial_update=extend_schema(summary='Partially update an event', description='Partially updating an event is allowed for authenticated users.'),
    update=extend_schema(summary='Update an event', description='Updating an event is allowed for authenticated users.'),
    destroy=extend_schema(summary='Delete an event', description='Deleting an event is allowed for authenticated users.'),
)
class EventViewSet(BaseModelViewSet):
    """
    ViewSet for viewing and editing events.
    """
    serializer_class = EventSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        if self.action != 'list':
            return Event.objects.all()
        queryset = Event.objects.all()
        name = self.request.query_params.get('name')
        from_date = self.request.query_params.get('from')
        to_date = self.request.query_params.get('to')
        public = self.request.query_params.get('public')
        owner = self.request.query_params.get('owner')

        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        if from_date is not None:
            queryset = queryset.filter(date__gte=from_date)
        if to_date is not None:
            queryset = queryset.filter(date__lte=to_date)
        if public is not None:
            if public == '0':
                if self.request.user.is_staff:
                    queryset = queryset.filter(public=public)
                else:
                    queryset = queryset.filter(public=public, owner__id=self.request.user.id)
            else:
                queryset = queryset.filter(public=public)
        else:
            queryset = queryset.filter(public=1)
        if owner is not None:
            queryset = queryset.filter(owner__username__icontains=owner)

        return queryset

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        elif self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'retrieve':
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        elif self.action == 'partial_update':
            permission_classes = [IsStaffOrOwner]
        elif self.action == 'update':
            permission_classes = [IsStaffOrOwner]
        elif self.action == 'destroy':
            permission_classes = [IsStaffOrOwner]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

@extend_schema_view(
    list=extend_schema(summary='List all artists', description='Listing all artists is allowed for authenticated users.',
        parameters=[
            OpenApiParameter(name='name', description='Filter by name', required=False, type=str),
            OpenApiParameter(name='description', description='Filter by description', required=False, type=str),
        ]
    ),
    create=extend_schema(summary='Create a new artist', description='Creating a new artist is allowed for authenticated users.'),
    retrieve=extend_schema(summary='Retrieve an artist', description='Retrieving an artist is allowed for authenticated users.'),
    partial_update=extend_schema(summary='Partially update an artist', description='Partially updating an artist is allowed for authenticated users.'),
    update=extend_schema(summary='Update an artist', description='Updating an artist is allowed for authenticated users.'),
    destroy=extend_schema(summary='Delete an artist', description='Deleting an artist is allowed for authenticated users.'),
)
class ArtistViewSet(BaseModelViewSet):
    """
    ViewSet for viewing and editing artists.
    """
    serializer_class = ArtistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Artist.objects.all()
        name = self.request.query_params.get('name')
        description = self.request.query_params.get('description')

        if name is not None:
            queryset = queryset.filter(name__icontains=name)
        if description is not None:
            queryset = queryset.filter(description__icontains=description)

        return queryset