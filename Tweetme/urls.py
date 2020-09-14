"""Tweetme URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.urls import include
from tweets.api.views import Home_view
from tweets.views import tweets_list_view , tweets_detail_view , home_view
from accounts.views import login_view, register_view, logout_view
from notifications.views import create_notification_view , update_notification_view , get_notifications_html
from django.views.generic import TemplateView

urlpatterns = [
    #path('tweets/', include('tweets.urls')) or we can use below paths
    #path('', home_view),
    # path('react/', TemplateView.as_view(template_name = 'react.html')),
    path('', home_view),
    path('global/' , tweets_list_view),
    path('<int:tweet_id>', tweets_detail_view),
    path('admin/', admin.site.urls),
    path('api/tweets/' , include('tweets.api.urls')),
    path('api/profiles/', include('profiles.api.urls')),
    path('profiles/' , include('profiles.urls')),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/', register_view),
    path('notify/<str:username>/', create_notification_view ),
    path('api/notifications/updateNotifications/', update_notification_view),
    path('notifications/', get_notifications_html),
    path('messages/', include('chat.urls')),
]



if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, 
                document_root=settings.STATIC_ROOT)