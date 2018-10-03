# Authorize server-to-server interactions from Google Compute Engine.
import httplib2
from oauth2client.contrib import gce

credentials = gce.AppAssertionCredentials(
    scope='https://www.googleapis.com/auth/devstorage.read_write')
http = credentials.authorize(httplib2.Http())
