from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count
from .models import Link, LinkClick
from .serializers import LinkSerializer, LinkClickSerializer

class LinkViewSet(viewsets.ModelViewSet):
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Link.objects.filter(profile__user=self.request.user)

    def perform_create(self, serializer):
        # Set the order to be the last position
        last_position = (
            Link.objects.filter(profile__user=self.request.user)
            .order_by('-order')
            .first()
        )
        order = (last_position.order + 1) if last_position else 0
        serializer.save(profile=self.request.user.profile, order=order)

    @action(detail=True, methods=['post'])
    def click(self, request, pk=None):
        link = self.get_object()
        ip_address = request.META.get('REMOTE_ADDR')
        
        # Only record click if it's been more than 30 minutes since last click from this IP
        thirty_mins_ago = timezone.now() - timedelta(minutes=30)
        recent_click = LinkClick.objects.filter(
            link=link,
            ip_address=ip_address,
            timestamp__gte=thirty_mins_ago
        ).first()
        
        if not recent_click:
            LinkClick.objects.create(
                link=link,
                ip_address=ip_address,
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
        
        return Response({
            'status': 'click recorded',
            'url': link.url
        })

    @action(detail=False, methods=['post'])
    def reorder(self, request):
        links = request.data.get('links', [])
        
        # Validate that all links belong to the user
        user_link_ids = set(
            Link.objects.filter(profile__user=request.user)
            .values_list('id', flat=True)
        )
        
        if not all(link_id in user_link_ids for link_id in links):
            return Response(
                {'detail': 'Invalid link IDs'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update order of all links
        for idx, link_id in enumerate(links):
            Link.objects.filter(id=link_id).update(order=idx)
        
        # Return updated links
        updated_links = self.get_queryset().order_by('order')
        serializer = self.get_serializer(updated_links, many=True)
        
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def analytics(self, request, pk=None):
        link = self.get_object()
        
        # Get click counts for different time periods
        now = timezone.now()
        today = now.replace(hour=0, minute=0, second=0, microsecond=0)
        
        total_clicks = link.clicks.count()
        today_clicks = link.clicks.filter(timestamp__gte=today).count()
        weekly_clicks = link.clicks.filter(timestamp__gte=today - timedelta(days=7)).count()
        monthly_clicks = link.clicks.filter(timestamp__gte=today - timedelta(days=30)).count()
        
        # Get recent clicks
        recent_clicks = LinkClickSerializer(
            link.clicks.all()[:10],
            many=True
        ).data
        
        return Response({
            'total_clicks': total_clicks,
            'today_clicks': today_clicks,
            'weekly_clicks': weekly_clicks,
            'monthly_clicks': monthly_clicks,
            'recent_clicks': recent_clicks
        })