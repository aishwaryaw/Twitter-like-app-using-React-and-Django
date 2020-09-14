from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import NotificationCreateSerializer , NotificationSerializer
from .models import Notification
from tweets.models import Tweet
# Create your views here.


User = get_user_model()

def get_notifications_html(request, *args, **kwargs):
    return render(request , "notifications/notifications.html")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_notification_view(request , username, *args, **kwargs):

    serializer = NotificationCreateSerializer(data = request.data)
    notify_to = User.objects.filter(username = username).first() #user9
    print(notify_to)
    logged_in_user = request.user #user1

    if serializer.is_valid(raise_exception = True):
        data = serializer.validated_data
        #print(data)
        action = data.get("action") # like
        tweet_id = data.get("tweet_id") #1

        if(tweet_id):
            tweet = Tweet.objects.filter(id = tweet_id).first()
            content = tweet.content

        if action == "like" :
            notification = Notification.objects.create(message = f"Your post ({content}) has been liked by {logged_in_user}" , user=notify_to)
            print(notification)
        
        elif action == "unlike":
            
            notification = notification = Notification.objects.create(message = f"Your post ({content}) has been unliked by {logged_in_user}", user = notify_to)

        elif action == "retweet":

            notification = Notification.objects.create(message = f"Your post ({content}) has been unliked by {logged_in_user}", user=notify_to)

        serializer = NotificationSerializer(notification)
        return Response(serializer.data , status=201)


    return Response({}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def update_notification_view(request , *args, **kwargs):

    logged_in_user = request.user #user1

    notifications = Notification.objects.filter( user = logged_in_user)
    if notifications.exists() and len(notifications) > 0 :
        for notification in notifications:
            notification.read_status = True
            notification.save() 
    
    unread_count = Notification.objects.get_unread_count(logged_in_user)

    serializer = NotificationSerializer(notifications, many= True , context = {"count" : unread_count})
    return Response(serializer.data, status=201)

    

        
    


    
