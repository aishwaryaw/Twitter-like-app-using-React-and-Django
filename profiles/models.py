from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from notifications.models import Notification

# Create your models here.

User = get_user_model()

class profile_following(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    profile = models.ForeignKey("Profile" , on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Profile(models.Model):

    user = models.OneToOneField(User , on_delete=models.CASCADE , null=True)
    location = models.CharField(max_length=220, blank=True, null=True)
    bio = models.TextField(null=True, blank=True)
    followers = models.ManyToManyField(User, related_name="following", through=profile_following , blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    #notifications = models.(Notification , related_name="notify", null = True , blank = True, on_delete=models.CASCADE)

    """
    project_obj = Profile.objects.first()
    project_obj.followers.all() -> All users following this profile
    user.following.all() -> All user profiles I follow
    """


# # # profile object will automatically get created after user has been saved    
def user_did_save(sender, instance , created, *args, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)


post_save.connect(user_did_save , sender=User) 

