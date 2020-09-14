from django.urls import path
from .views import tweets_list_view , tweets_detail_view , home_view

urlpatterns = [
    
    path('', home_view),
    path('global/' , tweets_list_view),
    path('<int:tweet_id>', tweets_detail_view)
    
]