from django.shortcuts import render , redirect
from profiles.models import Profile
from profiles.forms import ProfileForm
from profiles.serializers import ProfileSerializer , ProfileActionSerializer
from notifications.serializers import NotificationSerializer
from notifications.models import Notification
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
# Create your views here.

User = get_user_model()

@api_view(['GET', 'POST'])
def profile_detail_view(request , username, *args , **kwargs):

    qs = Profile.objects.filter(user__username = username)
    if not qs.exists():
        return Response({"message": "Object not found"}, status=404)
    
    profile = qs.first()

    if request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({"detail":"Authentication credentials were not provided."}, 403)

        serializer = ProfileActionSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            action = data.get("action")
            len1 = profile.followers.count()

            if request.user != profile.user :
                
                me = request.user
                
                if action == "follow":
                    profile.followers.add(me)
                    len = profile.followers.count()
                    if len == (len1 + 1) :
                        notification = Notification.objects.create(
                        message = f"You are being followed by {request.user}" ,
                        user=profile.user,
                        read_status = "False")
                    
                elif action == "unfollow":
                    profile.followers.remove(me)
                    len = profile.followers.count()
                    if len == (len1 - 1) :
                        notification = Notification.objects.create(
                        message = f"You are being unfollowed by {request.user}" ,
                        user=profile.user,
                        read_status = "False")

                    
                else:
                    pass
    
    serializer = ProfileSerializer(profile , context = {"request" : request})
    
    return Response(data=serializer.data , status=200)


@api_view(['GET'])
def profile_get_notifications_view(request, *args, **kwargs):

    user = request.user

    if user.is_authenticated:
        # notifications = Notification.objects.filter(
        #     Q( user = user) & Q(read_status = "False")).distinct()
        # unread_count = len(notifications)
        unread_count = Notification.objects.get_unread_count(request.user)
        notifications = Notification.objects.filter(user = user).order_by('-timestamp')
        serializer = NotificationSerializer(notifications , many = True , context = {"count": unread_count})
        for notification in notifications:
            notification.read_status = True
            notification.save() 
        return Response(serializer.data , status=200)

    return Response({"detail":"Authentication credentials were not provided."}, 403)



def update_profile_view_html(request, *args, **kwargs):

    if not request.user.is_authenticated:
        return redirect("/login?next=/profile/update/")

    user = request.user
    user_data = {
        "first_name" : user.first_name,
        "last_name" : user.last_name,
        "email" : user.email
    }

    profile = user.profile

    form = ProfileForm(request.POST or None , instance = profile, initial = user_data)
    if form.is_valid():
        form.save(commit = False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')
        user.first_name= first_name
        user.last_name = last_name
        user.email = email
        user.save()
        profile.save() # bio and location
        return redirect("/")
    
    context = {
        'form' : form
    }

    return render(request , "updateProfile.html", context)



def profile_detail_view_html(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    is_following = False
    if request.user.is_authenticated:
        user = request.user
        is_following = user in profile_obj.followers.all()
        # is_following = profile_obj in user.following.all()
    context = {
        "username": username,
        "profile": profile_obj,
        "is_following": is_following
    }
    return render(request, "detail.html", context)


    
    






    





