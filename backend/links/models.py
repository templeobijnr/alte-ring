from django.db import models
from profiles.models import Profile

class Link(models.Model):
    PLATFORM_CHOICES = [
        ('custom', 'Custom Link'),
        ('instagram', 'Instagram'),
        ('twitter', 'Twitter'),
        ('linkedin', 'LinkedIn'),
        ('whatsapp', 'WhatsApp'),
    ]

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='links')
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES, default='custom')
    label = models.CharField(max_length=100)
    url = models.URLField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.profile.user.username} - {self.label}"

class LinkClick(models.Model):
    link = models.ForeignKey(Link, on_delete=models.CASCADE, related_name='clicks')
    ip_address = models.GenericIPAddressField()
    user_agent = models.CharField(max_length=500)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']