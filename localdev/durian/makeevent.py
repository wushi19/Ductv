# [START calendar_makeevent]

from __future__ import print_function
import datetime
from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client import file, client, tools

# If modifying these scopes, delete the file token.json
SCOPES = 'https://www.googleapis.com/auth/calendar'


"""Shows basic usage of the Google Calendar API.
Prints the start and name of the next 10 events on the user's calendar.
"""
store = file.Storage('token.json')  #this gives us access to user's calendar
creds = store.get()
if not creds or creds.invalid:
    flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
    creds = tools.run_flow(flow, store)
service = build('calendar', 'v3', http=creds.authorize(Http()))
#Make an event!
name = 'Lunch with Dr.Dornold'
location = 'COX Hall'
description = 'Talk about the TA\'s new haircut!!!'
#time is store in RFC3339 format
startTime = '2018-10-11T13:00:00-04:00' #'-04:00' is UTC offset for
endTime = '2018-10-11T14:00:00-04:00'
timeZone = 'America/New_York'
attendee = 'ssono4013@gmail.com'

event = {
'summary': name,
'location': location,
'description': description,
'start': {
    'dateTime': startTime,
    'timeZone': timeZone,
},
'end': {
    'dateTime': endTime,
    'timeZone': endTime,
},
'attendees': [
    {'email': attendee},
],
}
start = event['start'].get('dateTime', event['start'].get('date'))
event = service.events().insert(calendarId='primary', body=event).execute()
print('Event created: %s' , (event.get('htmlLink')))
# [END calendar_makeevent]
