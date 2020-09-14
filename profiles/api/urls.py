from .views import profile_detail_view , profile_get_notifications_view
from django.urls import path


urlpatterns = [
    path('notifications/', profile_get_notifications_view),
    path('<str:username>/' , profile_detail_view),
    path('<str:username>/follow' , profile_detail_view),
    
  
]