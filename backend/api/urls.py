# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ProfileViewSet, PetSearchView, FavoriteViewSet, CommentViewSet, CreateUserView, PetDetailView

# router = DefaultRouter()
# router.register(r"profiles", ProfileViewSet, basename="profile")
# router.register(r"favorites", FavoriteViewSet, basename="favorite")
# router.register(r"comments", CommentViewSet, basename="comment")

# urlpatterns = [
#     path("search/", PetSearchView.as_view(), name="search"),
#     path("register/", CreateUserView.as_view(), name="register"),
#     path("animal/<int:pet_id>/", PetDetailView.as_view(), name="pet-detail"),
#     path("", include(router.urls)),
# ]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    ProfileViewSet,
    PetSearchView,
    FavoriteViewSet,
    CommentViewSet,
    CreateUserView,
    PetDetailView,
)

router = DefaultRouter()
router.register(r"profiles", ProfileViewSet, basename="profile")
router.register(r"favorites", FavoriteViewSet, basename="favorite")
router.register(r"comments", CommentViewSet, basename="comment")

urlpatterns = [
    path("search/", PetSearchView.as_view(), name="search"),
    path("register/", CreateUserView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("animal/<int:pet_id>/", PetDetailView.as_view(), name="pet-detail"),
    path("", include(router.urls)),
]
