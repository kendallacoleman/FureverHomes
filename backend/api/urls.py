from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PetSearchView, FavoriteViewSet, CommentViewSet, PetDetailView

# Router for viewsets (favorites and comments)
router = DefaultRouter()
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('search/', PetSearchView.as_view(), name='search'),  # existing search
    path('pets/<str:pet_id>/', PetDetailView.as_view(), name='pet-detail'),  # pet detail page
]

# Add router urls (favorites, comments)
urlpatterns += router.urls
