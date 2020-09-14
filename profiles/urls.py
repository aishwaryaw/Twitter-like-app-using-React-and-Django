from .views import profile_detail_view , update_profile_view
from django.urls import path


urlpatterns = [
    
    path('update/' , update_profile_view),
    path('<str:username>/' , profile_detail_view),

]