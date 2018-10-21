from django.shortcuts import render, HttpResponse, redirect
from datetime import datetime, timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile, Event, Invite, Calendar, Task#, FlowModel, CredentialsModel
from .serializers import ProfileSerializer, EventSerializer, InviteSerializer, CalendarSerializer, TaskSerializer, UserSerializer


from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from httplib2 import Http
from oauth2client.client import OAuth2WebServerFlow
from oauth2client import file, client, tools
import datetime

#TODO time, recurrence, auth
SCOPES = 'https://www.googleapis.com/auth/calendar'

def magic(request): #for testing web oauth2
    code = request.GET.get('code')
    credentials = flow.step2_exchange(code)
    return HttpResponse(str(code))

def auth1(request):#for testing weboauth2
    client_id = "1057673539100-9ihlr9o0afv13focvsa1gvu0ve56luek.apps.googleusercontent.com"
    client_secret = 'z77z0dJ0A0HfIHr1CJR1SpeK'
    redirect_uri='https://www.google.com'
    flow = OAuth2WebServerFlow(client_id="",
        client_secret='',
        scope='https://www.googleapis.com/auth/calendar',
        redirect_uri=redirect_uri)

    auth_uri = flow.step1_get_authorize_url()
    return redirect(auth_uri)
    #return HttpResponse(u)


def getService():
    store = file.Storage('token.json')  #this gives us access to user's calendar
    creds = store.get()
    service = build('calendar', 'v3', http=creds.authorize(Http()))
    return service

def googlePackage(request):
    data = request.data
    name = data['header']
    location = data['location']
    description = data['description']
    startTime = data['startTime']
    endTime = data['endTime']
    timeZone = data['timezone']
    attendee = 'ssono4013@gmail.com'
    id = data['googleID']
    print(startTime)

    event = {
    'summary': name,
    'location': location,
    'description': description,
    'id': id,
    'start': {
        'timeZone': timeZone,
        'dateTime': startTime,
    },
    'end': {
        'timeZone': timeZone,
        'dateTime': endTime,
    },
    'attendees': [
        {'email': attendee},
    ],
    }
    return event

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        service = getService()

        data = request.data
        name = data['header']
        location = data['location']
        description = data['description']
        startTime = data['startTime'] + ":00-04:00"
        endTime = data['endTime'] + ":00-04:00"
        timeZone = data['timezone']
        attendee = 'ssono4013@gmail.com'
        id = data['googleID']

        event = {
        'summary': name,
        'location': location,
        'description': description,
        'id': id,
        'start': {
            'timeZone': timeZone,
            'dateTime': startTime,
        },
        'end': {
            'timeZone': timeZone,
            'dateTime': endTime,
        },
        'attendees': [
            {'email': attendee},
        ],
        }
        start = event['start'].get('dateTime', event['start'].get('date'))
        event = service.events().insert(calendarId='primary', body=event).execute()

        request.data._mutable = True
        request.data['googleID'] = event['id']
        request.data._mutable = False

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        service = getService()
        instance = self.get_object()
        if instance.googleID:
            try:
                service.events().delete(calendarId='primary', eventId=instance.googleID).execute()
            except HttpError:
                pass
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        service = getService()
        event = googlePackage(request)
        updated_event = service.events().update(calendarId='primary', eventId=event['id'], body=event).execute()

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}


        return Response(serializer.data)

class InviteView(viewsets.ModelViewSet):
    queryset = Invite.objects.all()
    serializer_class = InviteSerializer

class CalendarView(viewsets.ModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer

class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

def newEvent(e):
    try:
        start = e['start']['dateTime']
        end = e['end']['dateTime']
    except KeyError:
        start = e['start']['date']
        end = e['end']['date']
    nevent = Event(created = datetime.datetime.utcnow(),
        updated = datetime.datetime.utcnow(),
        header = e['summary'],
        description = e['description'],
        startTime = start,
        endTime = end,
        timezone = 'EST',
        recurring = False,
        private = False,
        calendar = Calendar.objects.get(header='primary'),
        location = e['location'],
        googleID = e['id'])
    nevent.save()

def updateEvent(updatingEvent, e):
    try:
        start = e['start']['dateTime']
        end = e['end']['dateTime']
    except KeyError:
        start = e['start']['date']
        end = e['end']['date']
    updatingEvent.created = datetime.datetime.utcnow()
    updatingEvent.updated = datetime.datetime.utcnow()
    updatingEvent.header = e['summary']
    updatingEvent.description = e['description']
    updatingEvent.startTime = start
    updatingEvent.endTime = end
    updatingEvent.timezone = 'EST'
    updatingEvent.recurring = False
    updatingEvent.private = False
    updatingEvent.calendar = Calendar.objects.get(header='primary')
    updatingEvent.location = e['location']
    updatingEvent.googleID = e['id']
    updatingEvent.save()
    return updatingEvent




def sync(request):
    service = getService()
    #calendarList = Calendars
    #for cal in calendarlist
    page_token = None
    while True:
      googEvents = service.events().list(calendarId='primary', pageToken=page_token).execute()
      page_token = googEvents.get('nextPageToken')
      if not page_token:
        break
    for e in googEvents['items']:
        print(e)
        try:
            editingEvent = Event.objects.get(googleID=e['id'])
            updateEvent(editingEvent, e)
        except Event.DoesNotExist:
            newEvent(e)
    return HttpResponse('syncing')
