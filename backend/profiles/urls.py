from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet

router = DefaultRouter()
router.register(r'', ProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router.urls)),
    path('u/<str:username>/', ProfileViewSet.as_view({'get': 'public'}), name='public-profile'),
]