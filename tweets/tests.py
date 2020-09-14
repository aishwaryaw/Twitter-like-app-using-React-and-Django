from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from .models import Tweet
# Create your tests here.

User = get_user_model()

class TweetTestCase(TestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(username = 'user1' , password = 'password')
        self.user2 = User.objects.create_user(username = 'user2', password = 'passowrd')
        self.tweet1 = Tweet.objects.create(content = "tweet1" , user = self.user1)
        self.tweet2 = Tweet.objects.create(content = "tweet2" , user = self.user1)
        self.tweet3 = Tweet.objects.create(content = "tweet3" , user = self.user2)


    def get_client(self):
        client = APIClient()
        client.login(username = self.user1.username , password = 'password')
        return client


    def test_tweet_created(self):
        tweet = Tweet.objects.create(content = "tweet4" , user = self.user1)
        self.assertEqual(Tweet.objects.all().count(), 4)
        self.assertTrue(tweet.id , 4)


    def test_tweet_related_name(self):
        self.assertEqual(self.user1.tweets.count(), 2) # here tweets is the related name for tweet and user relationship


    def test_tweet_action(self):
        user1 = self.user1
        user2 = self.user2

        tweet = self.tweet1

        tweet.likes.add(user1)

        self.assertEqual(tweet.likes.count(), 1)


    def test_tweet_list_api_endpoint(self):
        client = self.get_client()
        response = client.get('/api/tweets/')
        self.assertEqual(response.status_code, 200)
        r_data = response.json()
        self.assertEqual(len(r_data), 3)


    def test_tweet_like_api_endpoint(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {
            "id" : 1 , 
            "action" : "like"
        })
        self.assertEqual(response.status_code, 200)
        tweet = Tweet.objects.filter(id=1).first()
        likes = tweet.likes.count()
        self.assertEqual(likes, 1)
        user = self.user1
        qs = user.tweet_like.all()
        self.assertTrue(tweet in qs)
        my_related_likes = user.tweet_like.count()
        self.assertEqual(my_related_likes , 1)
        self.assertEqual(likes , my_related_likes)

    def test_tweet_unlike_api_endpoint(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/', {
            "id" : 1 , 
            "action" : "like"
        })
        self.assertEqual(response.status_code, 200)
        tweet = Tweet.objects.filter(id=1).first()
        likes = tweet.likes.count()
        self.assertEqual(likes, 1)
        

        response = client.post('/api/tweets/action/', {
            "id" : 1 , 
            "action" : "unlike"
        })

        self.assertEqual(response.status_code, 200)
        likes = tweet.likes.count()
        self.assertEqual(likes, 0)
        user = self.user1
        qs = user.tweet_like.all()
        self.assertFalse(tweet in qs)
        my_related_likes = user.tweet_like.count()
        self.assertEqual(my_related_likes , 0)
        self.assertEqual(likes , my_related_likes)


    def test_tweet_create_api_endpoint(self):

        client = self.get_client()
        response = client.post('/api/tweets/create/', { 
            "content" : "tweet4"
        })
        self.assertEqual(response.status_code, 201)
        r_data = response.json()
        new_tweet_id = r_data.get("id")
        self.assertEqual(new_tweet_id , 4)
        self.assertEqual(Tweet.objects.all().count(), 4)


    def test_tweet_detail_api_endpoint(self):
        client = self.get_client()
        response = client.get(f'/api/tweets/{self.tweet1.id}/')
        self.assertEqual(response.status_code, 200)
        r_data = response.json()
        tweet_content = r_data.get("content")
        self.assertEqual(tweet_content, "tweet1")


    def test_tweet_delete_api_endpoint(self):
        client = self.get_client()
        response = client.delete(f'/api/tweets/{self.tweet1.id}/delete/')
        self.assertEqual(response.status_code, 200)
        r_data = response.json()
        tweet_message = r_data.get("message")
        self.assertEqual(tweet_message ,"tweet is deleted")

        response = client.delete(f'/api/tweets/{self.tweet1.id}/delete/')
        self.assertEqual(response.status_code, 404)

        response_incorrect_owner = client.delete(f'/api/tweets/{self.tweet3.id}/delete/')
        self.assertEqual(response_incorrect_owner.status_code, 401)
        



















