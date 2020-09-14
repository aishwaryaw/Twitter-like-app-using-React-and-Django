from rest_framework import serializers
from .models import Notification
from profiles.serializers import ProfileSerializer

class NotificationCreateSerializer(serializers.Serializer):

    action = serializers.CharField()
    tweet_id = serializers.IntegerField(required=False)

    def validate_action(self, value):
        action =  value.lower().strip()
        if not action in ['like', 'unlike', 'retweet']:
            return serializers.ValidationError("Action is not valid")

        return value


class NotificationSerializer(serializers.ModelSerializer):

    message = serializers.CharField()
    user =  ProfileSerializer(source='user.profile' , read_only=True)
    count = serializers.SerializerMethodField()


    class Meta:
        model = Notification
        fields = ['id','message' , 'user' ,'timestamp', 'count' , 'read_status']

    # def get_user(self, obj):
    #     return obj.user.username

    def get_count(self, obj):
        context = self.context
        count = context.get("count")
        return count


