from rest_framework import serializers
from .models import Profile

class ProfileActionSerializer(serializers.Serializer):
   
    action = serializers.CharField()

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in ['follow', 'unfollow']:
            raise serializers.ValidationError("this action is not permitted")
        return value



class ProfileSerializer(serializers.ModelSerializer):

    first_name = serializers.SerializerMethodField(read_only =True)
    last_name = serializers.SerializerMethodField(read_only =True)
    username = serializers.SerializerMethodField(read_only =True)
    follower_count = serializers.SerializerMethodField(read_only =True)
    following_count = serializers.SerializerMethodField(read_only =True)
    is_following = serializers.SerializerMethodField(read_only =True)

    class Meta:
        model = Profile
        fields = ['id', 'bio', 'location', 'first_name', 'last_name', 'username', 'follower_count', 'following_count', 'is_following']
    
    def get_first_name(self, obj):
        return  obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name
    
    def get_username(self, obj):
        return obj.user.username

    def get_follower_count(self, obj):
        return obj.followers.count()
    
    def get_following_count(self, obj):
        return obj.user.following.count()
    
    def get_is_following(self, obj):
        is_following = False
        context = self.context
        request = context.get("request")
        if request:
            user = request.user
            is_following = user in obj.followers.all()

        return is_following

