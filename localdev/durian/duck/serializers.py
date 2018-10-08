from rest_framework import serializers
from .models import Profile, Time, Event, Invite, Calendar, Task

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'url', 'email', 'user')

class TimeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Time
        fields = ('id', 'url', 'time', 'date', 'timezone')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'url', 'header', 'description', 'start', 'end', 'private', 'calendar', 'created', 'updated')

class InviteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Invite
        fields = ('id', 'url', 'organizer', 'invitee', 'event', 'accepted')

class CalendarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Calendar
        fields = ('id', 'url', 'header', 'owner', 'timezone', 'description')

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'url', 'header', 'description', 'priority', 'duration', 'due', 'people')
