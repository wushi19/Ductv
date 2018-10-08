from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('profile', views.ProfileView)
router.register('time', views.TimeView)
router.register('event', views.EventView)
router.register('invite', views.InviteView)
router.register('calendar', views.CalendarView)
router.register('task', views.TaskView)

urlpatterns = [
    path('', include(router.urls))
]
