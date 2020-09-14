from .models import Tweet
from rest_framework import serializers
from profiles.serializers import ProfileSerializer

class TweetActionSerializer(serializers.Serializer):

    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True , required=False)

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in ['like' , 'unlike' , 'retweet']:
            raise serializers.ValidationError("This action is not permitted")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):

    user = ProfileSerializer(source = 'user.profile', read_only= True)
    likes = serializers.SerializerMethodField(read_only = True)
    

    class Meta:
        model = Tweet
        fields = ['id', 'content' , 'user' , 'likes', 'timestamp']


    def get_user(self, obj):
        return obj.user.id

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > 120:
            raise serializers.ValidationError("this content is too long")
        elif len(value) < 5 :
            raise serializers.ValidationError("this content is too short")
        return value



class TweetSerializer(serializers.ModelSerializer):

    likes = serializers.SerializerMethodField()
    user = ProfileSerializer(source='user.profile', read_only=True)
    parent = TweetCreateSerializer(read_only = True)
    
    class Meta:
        model = Tweet
        fields = ['id' , 'content' , 'likes', 'user', 'is_retweet', 'parent' ]

    def get_likes(self , obj):

        return obj.likes.count()   

    
        


