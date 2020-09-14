from django.test import TestCase
from rest_framework.test import APIClient
from .models import Profile
from django.contrib.auth import get_user_model
# Create your tests here.

User = get_user_model()

class ProfileTestCase(TestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='user1')
        self.user2 = User.objects.create_user(username='user2', password='user2')

    # for authentication purpose - logging in user 
    def get_client(self):
        client = APIClient()
        client.login(username= self.user1.username, password = 'user1')
        return client

    def test_profile_created_via_signal(self):
        qs= Profile.objects.all()
        self.assertEqual(qs.count(), 2 )


    def test_profile_following(self):

        usera= self.user1
        userb = self.user2
        usera.profile.followers.add(userb) # in user.following we get profiles and in profile.followers we get users
        useraprofileid = usera.profile.id
        qs = userb.following.filter(id = useraprofileid)
        self.assertTrue(qs.exists())
        qs = usera.profile.followers.filter(username = userb.username)
        self.assertTrue(qs.exists())
        self.assertEqual(usera.profile.followers.count() , 1)


    def test_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(f"/api/profiles/{self.user2.username}/", {"action" : "follow"})
        data = response.json()
        count = data.get("follower_count")
        self.assertEqual(count, 1)

    def test_unfollow_api_endpoint(self):
        client = self.get_client()
        self.user2.profile.followers.add(self.user1)
        response = client.post(f"/api/profiles/{self.user2.username}/", {"action" : "unfollow"})
        data = response.json()
        count = data.get("follower_count")
        self.assertEqual(count, 0)

    def test_cannot_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(f"/api/profiles/{self.user1.username}/", {"action" : "follow"})
        data = response.json()  
        count = data.get("follower_count")
        self.assertEqual(count, 0)
        
    


        


        






