from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('profile', views.ProfileView)
router.register('event', views.EventView)
router.register('invite', views.InviteView)
router.register('calendar', views.CalendarView)
router.register('task', views.TaskView)
router.register('user', views.UserView)

urlpatterns = [
    path('', include(router.urls)),
    path('sync', views.sync),
    path('auth1/', views.auth1),
    path('magic/', views.magic),
]
