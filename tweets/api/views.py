from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view , authentication_classes , permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from tweets.serializers import TweetActionSerializer , TweetSerializer ,TweetCreateSerializer
from tweets.models import Tweet
from notifications.models import Notification
from django.contrib.auth import get_user_model
# Create your views here.

User = get_user_model()

@api_view(['GET'])
def Home_view(request , *args, **kwargs):

    tweets = Tweet.objects.all()
    serializer = TweetSerializer(tweets , many=True)
    context = {
        'tweets' : serializer.data
    }

    return Response( data= serializer.data , status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args , **kwargs):

    serializer = TweetActionSerializer(data=request.data)
    #print(request.data)
    #print(request.user)
   
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
    
        qs = Tweet.objects.filter(id = tweet_id)

        if not qs.exists():
            return Response({}, 404)

        tweet = qs.first()
        notify_to = tweet.user
        serializer = TweetSerializer(tweet)
        len1 = serializer.data["likes"]
        
        if action == "like":
            tweet.likes.add( request.user )
            serializer = TweetSerializer(tweet)
            len = serializer.data["likes"]
            if len == (len1 + 1) and (notify_to.username != request.user.username):
                notification = Notification.objects.create(
                message = f"Your post ({tweet.content}) has been liked by {request.user}" ,
                user=notify_to,
                read_status = "False")
            
            return Response(data = serializer.data , status=200)
    
             
        elif action == "unlike":
            tweet.likes.remove(request.user)
            serializer = TweetSerializer(tweet)
            len = serializer.data["likes"]
            if len == (len1 - 1) and (notify_to.username != request.user.username):
                notification = Notification.objects.create(
                message = f"Your post ({tweet.content}) has been unliked by {request.user}" ,
                user=notify_to,
                read_status = "False")
            
            serializer = TweetSerializer(tweet)
            return Response(data = serializer.data , status=200)
    

        elif action == "retweet":
            new_tweet = Tweet.objects.create(
                parent = tweet,
                user = request.user,
                content = content
            )
            if notify_to.username != request.user.username :

                notification = Notification.objects.create(
                message = f"Your post ({tweet.content}) has been retweeted by {request.user}" ,
                user=notify_to,
                read_status = "False")

            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data , status = 201)
    
        
    return Response({}, status=200)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):

    serializer = TweetCreateSerializer(data = request.data)
    user = request.user
    if serializer.is_valid(raise_exception=True):
        serializer.save(user= user)
        return Response(serializer.data , status=201)
        
    return Response({}, status=400)



@api_view(['GET'])
def tweet_detail_view(request, tweet_id , *args , **kwargs):

    qs = Tweet.objects.filter(id = tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    
    tweet = qs.first()
    serializer = TweetSerializer(tweet)

    return Response(serializer.data , status=200 )



@api_view(['DELETE','POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id , *args , **kwargs):

    qs = Tweet.objects.filter(id = tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    
    qs = qs.filter(user = request.user)

    if not qs.exists():
        return Response({"message" : "u can't delete this tweet"}, status=401)
    
    obj = qs.first()
    obj.delete()
    return Response({"message" : "tweet is deleted"} , status=200)



def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 2
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = TweetSerializer(paginated_qs, many=True , context = {"request" : request})
    return paginator.get_paginated_response(serializer.data) 



#if user is not logged in then all tweets will be displayed 
# and if user clicks on any user's profile then tweets of that particualr user will be displayed
@api_view(['GET'])  
def tweet_list_view(request, *args , **kwargs):
    
    qs = Tweet.objects.all()
    username = request.GET.get("username")

    if username != None:
        qs = Tweet.objects.by_username(username) # using query set manager and model manager written in models.py
        #qs = Tweet.objects.filter(user__username = username)

    # without pagination
    # serializer = TweetSerializer(qs , many= True)
    # return Response(serializer.data , status=200)
    return get_paginated_queryset_response(qs, request)



# if user is logged in then this page will be displayed
# it will display tweets of all the users who are followed by the logged in user.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tweet_feed_view(request , *args , **kwargs ):

    user = request.user #logged in user
    # Tweet.objects.feed(user) // using query set manager and model manager written in models.py
    profile_exists = user.following.exists()
    followed_users_id = []
    if profile_exists :
        followed_users_id = user.following.values_list("user__id" , flat = True) 
        # profiles = user.following.all() # [x.user.id for x in profiles]
    tweets = Tweet.objects.filter(
            Q(user__id__in = followed_users_id) | Q(user=user)).distinct().order_by("-timestamp")


    # without pagination
    # serializer = TweetSerializer(tweets , many= True)
    # return Response(serializer.data , status=200)

    return get_paginated_queryset_response(tweets, request)
    
























   



    


