from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Q
# Create your models here.

User = get_user_model()


class NotificationQuerySet(models.QuerySet):

    def get_unread_count(self, user):
        notifications = Notification.objects.filter(
            Q( user = user) & Q(read_status = "False")).distinct()
        unread_count = len(notifications)
        return unread_count

class NotificationManager(models.Manager):

    def get_queryset(self , *args , **kwargs ):
        return NotificationQuerySet(self.model , using = self._db)
    
    def get_unread_count(self, user):
        return self.get_queryset().get_unread_count(user)



class Notification(models.Model):

    message = models.CharField(max_length=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name="notifications")
    read_status = models.CharField(default=False , max_length=5)
    timestamp = models.DateTimeField(auto_now_add=True)
    objects = NotificationManager()


# tweet- User
# Notification - user

# t1 - u1
# t2 - u1
# t3  - u2

# n1 - u1
# n2 - u1
# n3 - u1
