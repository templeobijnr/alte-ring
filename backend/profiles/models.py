from django.db import models
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    theme = models.JSONField(default=dict)
    location = models.CharField(max_length=200, blank=True)
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

class ProfileView(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='views')
    ip_address = models.GenericIPAddressField()
    user_agent = models.CharField(max_length=500)
    location = models.CharField(max_length=200, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']