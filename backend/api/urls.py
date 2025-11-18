from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, PetSearchView, FavoriteViewSet, CommentViewSet, CreateUserView, PetDetailView
from .views import get_csrf_token

router = DefaultRouter()
router.register(r"profiles", ProfileViewSet, basename="profile")
router.register(r"favorites", FavoriteViewSet, basename="favorite")
router.register(r"comments", CommentViewSet, basename="comment")

urlpatterns = [
    path('csrf/', get_csrf_token, name='csrf'),
    path("search/", PetSearchView.as_view(), name="search"),
    path("register/", CreateUserView.as_view(), name="register"),
    path("animal/<int:pet_id>/", PetDetailView.as_view(), name="pet-detail"),
    path("", include(router.urls)),
]