from django.contrib.auth.models import User
from .models import Profile, Favorite, Comment
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password"]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    avatar = serializers.ImageField(required=False, allow_null=True, use_url=True)

    class Meta:
        model = Profile
        fields = ["id", "user", "bio", "avatar"]
        read_only_fields = ["user"]
    
    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "username": obj.user.username
        }
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Ensure avatar URL is absolute
        request = self.context.get('request')
        if instance.avatar and request:
            representation['avatar'] = request.build_absolute_uri(instance.avatar.url)
        return representation
    
    def update(self, instance, validated_data):
        instance.bio = validated_data.get('bio', instance.bio)
        
        if 'avatar' in validated_data and validated_data['avatar'] is not None:
            # Delete old avatar if it exists
            if instance.avatar:
                instance.avatar.delete(save=False)
            instance.avatar = validated_data['avatar']
        
        instance.save()
        return instance

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "user", "pet_name", "pet_id", "created_at"]
        read_only_fields = ["user", "created_at"]

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    user_avatar = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'user', 'user_avatar', 'pet_id', 'text', 'created_at']
        read_only_fields = ['user', 'user_avatar', 'created_at']
    
    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username
        }
    
    def get_user_avatar(self, obj):
        request = self.context.get('request')
        if hasattr(obj.user, 'profile') and obj.user.profile.avatar and request:
            return request.build_absolute_uri(obj.user.profile.avatar.url)
        return None