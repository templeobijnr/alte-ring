from rest_framework import serializers
from .models import Link, LinkClick

class LinkSerializer(serializers.ModelSerializer):
    click_count = serializers.SerializerMethodField()

    class Meta:
        model = Link
        fields = ('id', 'platform', 'label', 'url', 'order', 
                 'is_active', 'click_count', 'created_at')
        read_only_fields = ('created_at',)

    def get_click_count(self, obj):
        return obj.clicks.count()

class LinkClickSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinkClick
        fields = ('id', 'ip_address', 'user_agent', 'timestamp')
        read_only_fields = ('timestamp',)