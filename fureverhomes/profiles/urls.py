from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path('me/', views.ProfileDetailView.as_view(), name='profile-detail'),
    path('', views.profile_view, name='profiles'),
]
