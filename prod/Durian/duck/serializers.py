from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Event, Invite, Calendar, Task

class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile = serializers.HyperlinkedRelatedField(many=False, read_only=True, view_name='profile-detail')
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'profile')


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    calendars = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='calendar-detail')
    tasks = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='task-detail')
    class Meta:
        model = Profile
        fields = ('id', 'url', 'user', 'tasks', 'calendars')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'url', 'header', 'description', 'startTime', 'endtime', 'recurring', 'private', 'calendar', 'created', 'updated', 'location')

class InviteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Invite
        fields = ('id', 'url', 'organizer', 'invitee', 'event', 'accepted')

class CalendarSerializer(serializers.HyperlinkedModelSerializer):
    events = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='event-detail')
    class Meta:
        model = Calendar
        fields = ('id', 'url', 'header', 'owner', 'timezone', 'description', 'events')

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'url', 'header', 'description', 'priority', 'duration', 'due', 'owner', 'completed')
