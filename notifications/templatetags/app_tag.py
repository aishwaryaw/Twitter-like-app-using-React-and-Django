from django import template
from notifications.models import Notification

register = template.Library()

@register.simple_tag
def get_unread_count(user):
    
    return Notification.objects.get_unread_count(user)