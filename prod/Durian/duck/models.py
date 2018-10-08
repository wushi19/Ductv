from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import timedelta, time, datetime, date

# Create your models here.
class Profile(models.Model):
    email = models.EmailField(blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)


    #user.profile.stuff
    #Create Profile on creation of user
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

    def __str__(self):
        return self.user.username

class Time(models.Model):
    date = models.DateField()
    time = models.TimeField()
    timezone = models.CharField(max_length=3)

    def __str__(self):
        return self.time

class Calendar(models.Model):
    timezone = models.CharField(max_length=3)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    header = models.CharField(max_length=80)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.header


class Event(models.Model):
    created = models.DateTimeField(default=datetime.now())
    updated = models.DateTimeField(default=datetime.now())
    header = models.CharField(max_length=80)
    description = models.TextField(null=True, blank=True)
    start = models.OneToOneField(Time, on_delete=models.CASCADE, related_name='start')
    end = models.OneToOneField(Time, on_delete=models.CASCADE, null=True, blank=True, related_name='end')
    private = models.BooleanField(default=True)
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)
    location = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.header

class Invite(models.Model):
    organizer = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='organizer')
    invitee = models.OneToOneField(Profile, on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    event = models.OneToOneField(Event, on_delete=models.CASCADE)

    def __str__(self):
        return self.accepted


class Task(models.Model):
    header = models.CharField(max_length=80)
    description = models.TextField(null=True, blank=True)
    priority = models.IntegerField(default=5)
    duration = models.IntegerField(default=30)
    people = models.ForeignKey(Profile, on_delete=models.CASCADE)
    due = models.DateTimeField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.header
