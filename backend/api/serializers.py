from django.contrib.auth.models import User
from .models import Profile, Favorite, Comment
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio', 'avatar_url']

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "user", "pet_name", "pet_id", "created_at"]
        read_only_fields = ["user", "created_at"]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'pet_id', 'text', 'created_at']
        read_only_fields = ['user', 'created_at']