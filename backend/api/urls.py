from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PetSearchView, PetDetailView, FavoriteViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorites')
router.register(r'comments', CommentViewSet, basename='comments')

urlpatterns = [
    path('search/', PetSearchView.as_view(), name='search'),
    path('animal/<int:pet_id>/', PetDetailView.as_view(), name='pet-detail'),
    path('', include(router.urls)),
]
