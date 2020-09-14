from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

# model managres and query set managers
class TweetQuerySet(models.QuerySet):

    def by_username(self , username):
        return self.filter(user__username__iexact = username) #any case is fine when iexact is used

    def feed(self  , user):
        profile_exists = user.following.exists()
        followed_users_id = []
        if profile_exists :
            followed_users_id = user.following.value_list("user__id" , flat = True) 
            # profiles = user.following.all() # [x.user.id for x in profiles]
        return self.filter(
                Q(user__id__in = followed_users_id) | Q(user=user)).distinct().order_by("-timestamps")



class TweetManager(models.Manager):

    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model , using=self._db)
    
    def feed(self , user):
        return self.get_queryset().feed(user)
    
    def by_username(self, username):
        return self.get_queryset().by_username(username)


class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE )
    timestamp = models.DateTimeField(auto_now_add=True)


class Tweet(models.Model):

    content = models.CharField(max_length=120 , blank=False)
    likes = models.ManyToManyField(User , related_name="tweet_like" , blank=True, through=TweetLike)
    parent = models.ForeignKey("self" ,null=True,  related_name="retweet" , on_delete=models.CASCADE)
    user = models.ForeignKey(User , related_name="tweets" , on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    objects = TweetManager()

    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.parent != None


