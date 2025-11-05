from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from .serializers import UserSerializer, ProfileSerializer, FavoriteSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
import requests
from django.conf import settings
from rest_framework.views import APIView
from .models import Profile, Favorite, Comment

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class PetSearchView(APIView):
    permission_classes = [AllowAny]

    def get_petfinder_token(self):
        url = "https://api.petfinder.com/v2/oauth2/token"
        data = {
            "grant_type": "client_credentials",
            "client_id": settings.PETFINDER_API_KEY,
            "client_secret": settings.PETFINDER_SECRET,
        }
        response = requests.post(url, data=data, timeout=10)
        response.raise_for_status()
        return response.json().get("access_token")

    def get(self, request):
        try:
            token = self.get_petfinder_token()
            headers = {"Authorization": f"Bearer {token}"}

            pet_id = request.query_params.get("id")
            if pet_id:
                # Fetch single pet by ID
                response = requests.get(
                    f"https://api.petfinder.com/v2/animals/{pet_id}",
                    headers=headers,
                    timeout=10,
                )
            else:
                # Fetch list of pets with filters
                params = {
                    "type": request.query_params.get("type"),
                    "location": request.query_params.get("location"),
                    "size": request.query_params.get("size"),
                    "gender": request.query_params.get("gender"),
                    "page": request.query_params.get("page", 1),
                    "limit": 12,
                }
                # Remove empty values
                params = {k: v for k, v in params.items() if v}
                response = requests.get(
                    "https://api.petfinder.com/v2/animals",
                    headers=headers,
                    params=params,
                    timeout=10,
                )

            response.raise_for_status()
            return Response(response.json(), status=response.status_code)

        except requests.exceptions.RequestException as e:
            print("Request error:", e)
            return Response({"error": str(e)}, status=502)
        except Exception as e:
            print("General error:", e)
            return Response({"error": str(e)}, status=500)


class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        pet_id = self.request.query_params.get("pet_id")
        if pet_id:
            return Comment.objects.filter(pet_id=pet_id).order_by("-created_at")
        return Comment.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PetDetailView(APIView):
    permission_classes = [AllowAny]

    def get_petfinder_token(self):
        url = "https://api.petfinder.com/v2/oauth2/token"
        data = {
            "grant_type": "client_credentials",
            "client_id": settings.PETFINDER_API_KEY,
            "client_secret": settings.PETFINDER_SECRET,
        }
        response = requests.post(url, data=data, timeout=10)
        response.raise_for_status()
        return response.json().get("access_token")

    def get(self, request, pet_id):
        try:
            token = self.get_petfinder_token()
            headers = {"Authorization": f"Bearer {token}"}
            response = requests.get(
                f"https://api.petfinder.com/v2/animals/{pet_id}",
                headers=headers,
                timeout=10,
            )
            response.raise_for_status()
            return Response(response.json(), status=response.status_code)
        except requests.exceptions.RequestException as e:
            print("Request error:", e)
            return Response({"error": str(e)}, status=502)
