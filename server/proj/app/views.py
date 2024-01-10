""" API views for the app. """
import datetime
from django.contrib.auth.models import Group, User
from drf_spectacular.utils import extend_schema_view, extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from rest_framework import permissions, viewsets
from .permissions import IsOwnerOrReadOnly, IsStaffOrOwner

from .serializers import (
    GroupSerializer,
    UserSerializer,
    EventSerializer,
    SignupSerializer,
)

from .models import (
    Event,
)

@extend_schema_view(
    list=extend_schema(summary='List all users', description='Listing all users is only allowed for admins.'),
    create=extend_schema(summary='Create a new user', description='Creating a new user is allowed for anyone.'),
    retrieve=extend_schema(summary='Retrieve a user', description='Retrieving a user is only allowed for staff or the user itself.'),
    partial_update=extend_schema(summary='Partially update a user', description='Partially updating a user is only allowed for staff or the user itself.'),
    destroy=extend_schema(summary='Delete a user', description='Deleting a user is only allowed for staff or the user itself.'),
)
class SignupViewSet(viewsets.ModelViewSet):
    """
    ViewSet for signing up new users.
    """
    queryset = User.objects.all()
    serializer_class = SignupSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = None
        return context
    
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
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing users.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = None
        return context

@extend_schema_view(
    list=extend_schema(summary='List all groups', description='Listing all groups is only allowed for admins.'),
    retrieve=extend_schema(summary='Retrieve a group', description='Retrieving a group is only allowed for admins.'),
)
class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing groups.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = None
        return context

@extend_schema_view(
    list=extend_schema(summary='List all events', description='Listing all events is allowed for authenticated users.',
        parameters=[


    # name = models.CharField('Event Name', max_length=200, help_text="イベント名を入力してください。")
    # date = models.DateTimeField('Event Date', help_text="イベントの日時を入力してください。")
    # location = models.CharField('Event Location', max_length=200, null=True, help_text="イベントの場所を入力してください。")
    # description = models.TextField('Event Description', null=True, help_text="イベントの説明を入力してください。")
    # public = models.IntegerField('Public Setting', default=0, help_text="公開設定を入力してください。0:非公開, 1:公開。")
    # owner = models.ForeignKey('auth.User', related_name='events', on_delete=models.CASCADE)


            
            OpenApiParameter(name='owner', description='Filter by owner', required=False, type=str),
            OpenApiParameter(name='date', description='Filter by date', required=False, type=OpenApiTypes.DATE, location=OpenApiParameter.QUERY,
                examples=[
                    OpenApiExample(
                        'Not specified',
                        summary='Not specified',
                        description='Not specified',
                        value=''
                    ),
                    OpenApiExample(
                        'Today',
                        summary='Today',
                        description='Today',
                        value=datetime.datetime.now().strftime('%Y-%m-%d')
                    ),
                ],
            ),
        ]),
    create=extend_schema(summary='Create a new event', description='Creating a new event is allowed for authenticated users.'),
    retrieve=extend_schema(summary='Retrieve an event', description='Retrieving an event is allowed for authenticated users.'),
    partial_update=extend_schema(summary='Partially update an event', description='Partially updating an event is allowed for authenticated users.'),
    destroy=extend_schema(summary='Delete an event', description='Deleting an event is allowed for authenticated users.'),
)
class EventViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing events.
    """
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = None
        return context

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = Event.objects.all()
        owner = self.request.query_params.get('owner')
        date = self.request.query_params.get('date')
        year = date.split('-')[0]
        month = date.split('-')[1]
        day = date.split('-')[2]

        if owner is not None:
            queryset = queryset.filter(owner__username__icontains=owner)
        if date is not None:
            queryset = queryset.filter(date__year__gte=year, date__month__gte=month, date__day__gte=day, date__year__lte=year, date__month__lte=month, date__day__lte=day)


        return queryset
