""" Custom permissions for the app. """
from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view):
        """ Check if the user is the owner of the object. """
        return request.user.is_authenticated and request.user.is_staff

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it, otherwise read-only.
    """

    def has_object_permission(self, request, view, obj):
        """ Check if the user is the owner of the object. """
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj.owner == request.user

class IsStaffOrOwner(permissions.BasePermission):
    """
    Custom permission to allow staff or owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        """ Check if the user is the owner of the object or staff. """
        return (request.user.is_staff or obj.id == request.user.id)
