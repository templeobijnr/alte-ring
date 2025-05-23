from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone
from datetime import timedelta
from .models import Profile, ProfileView
from .serializers import ProfileSerializer, ProfileViewSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.action == 'public':
            return Profile.objects.filter(is_public=True)
        return Profile.objects.filter(user=self.request.user)

    def get_permissions(self):
        if self.action in ['public', 'analytics']:
            return [AllowAny()]
        return super().get_permissions()

    @action(detail=False, methods=['get'])
    def me(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def public(self, request, username=None):
        try:
            profile = Profile.objects.get(user__username=username, is_public=True)
            serializer = self.get_serializer(profile)
            
            # Only record view if it's been more than 30 minutes since last view from this IP
            ip_address = request.META.get('REMOTE_ADDR')
            thirty_mins_ago = timezone.now() - timedelta(minutes=30)
            
            recent_view = ProfileView.objects.filter(
                profile=profile,
                ip_address=ip_address,
                timestamp__gte=thirty_mins_ago
            ).first()
            
            if not recent_view:
                ProfileView.objects.create(
                    profile=profile,
                    ip_address=ip_address,
                    user_agent=request.META.get('HTTP_USER_AGENT', '')
                )
            
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response(
                {'detail': 'Profile not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['get'])
    def analytics(self, request, pk=None):
        profile = self.get_object()
        
        # Get view counts for different time periods
        now = timezone.now()
        today = now.replace(hour=0, minute=0, second=0, microsecond=0)
        
        total_views = profile.views.count()
        today_views = profile.views.filter(timestamp__gte=today).count()
        weekly_views = profile.views.filter(timestamp__gte=today - timedelta(days=7)).count()
        monthly_views = profile.views.filter(timestamp__gte=today - timedelta(days=30)).count()
        
        # Get recent views
        recent_views = ProfileViewSerializer(
            profile.views.all()[:10],
            many=True
        ).data
        
        return Response({
            'total_views': total_views,
            'today_views': today_views,
            'weekly_views': weekly_views,
            'monthly_views': monthly_views,
            'recent_views': recent_views
        })