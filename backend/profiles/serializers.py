from rest_framework import serializers
from .models import Profile, ProfileView
from links.serializers import LinkSerializer

class ProfileSerializer(serializers.ModelSerializer):
    links = LinkSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    avatar = serializers.ImageField(source='user.avatar', read_only=True)
    view_count = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('id', 'username', 'email', 'avatar', 'bio', 'theme', 
                 'is_public', 'links', 'view_count', 'created_at')
        read_only_fields = ('created_at',)

    def get_view_count(self, obj):
        return obj.views.count()

class ProfileViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileView
        fields = ('id', 'ip_address', 'user_agent', 'timestamp')
        read_only_fields = ('timestamp',)