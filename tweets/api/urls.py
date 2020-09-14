from .views import Home_view , tweet_action_view , tweet_create_view , tweet_list_view , tweet_delete_view, tweet_feed_view, tweet_detail_view
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('' , tweet_list_view),
    path('action/' , tweet_action_view),
    path('<int:tweet_id>/' , tweet_detail_view),
    path('<int:tweet_id>/delete/' , tweet_delete_view),
    path('create/' , tweet_create_view),
    path('feed/' , tweet_feed_view)
    
]