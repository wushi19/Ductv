from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile, Event, Invite, Calendar, Task
from .serializers import ProfileSerializer, EventSerializer, InviteSerializer, CalendarSerializer, TaskSerializer, UserSerializer

from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client import file, client, tools
import datetime

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    # def create(self, request, *args, **kwargs):
    #     store = file.Storage('token.json')  #this gives us access to user's calendar
    #     creds = store.get()
    #     service = build('calendar', 'v3', http=creds.authorize(Http()))
    #
    #     data = request.data
    #     name = data['header']
    #     location = data['location']
    #     description = data['description']
    #     startTime = data['startTime'] +":00-04:00"
    #     endTime = data['endtime'] +":00-04:00"
    #     timeZone = 'America/New_York'
    #     attendee = 'ssono4013@gmail.com'
    #
    #     event = {
    #     'summary': name,
    #     'location': location,
    #     'description': description,
    #     'start': {
    #         'dateTime': startTime,
    #         'timeZone': timeZone,
    #     },
    #     'end': {
    #         'dateTime': endTime,
    #         'timeZone': endTime,
    #     },
    #     'attendees': [
    #         {'email': attendee},
    #     ],
    #     }
    #     start = event['start'].get('dateTime', event['start'].get('date'))
    #     event = service.events().insert(calendarId='primary', body=event).execute()
    #
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class InviteView(viewsets.ModelViewSet):
    queryset = Invite.objects.all()
    serializer_class = InviteSerializer

class CalendarView(viewsets.ModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer

class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

def sync(request):
    pass
