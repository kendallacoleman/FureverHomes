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

# class ProfileSerializer(serializers.ModelSerializer):
#     avatar = serializers.ImageField(required=False)

#     class Meta:
#         model = Profile
#         fields = ["id", "user", "bio", "avatar"]
#         read_only_fields = ["user"]
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
    
    def update(self, instance, validated_data):
        print(f"Updating profile with data: {validated_data}")
        instance.bio = validated_data.get('bio', instance.bio)
        
        if 'avatar' in validated_data and validated_data['avatar'] is not None:
            # Delete old avatar if it exists
            if instance.avatar:
                instance.avatar.delete(save=False)
            instance.avatar = validated_data['avatar']
            print(f"Avatar set to: {instance.avatar}")
        
        instance.save()
        print(f"Profile saved. Avatar path: {instance.avatar}")
        return instance

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