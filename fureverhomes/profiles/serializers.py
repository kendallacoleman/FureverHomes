from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Profile
        fields = ['id', 'username', 'email', 'bio', 'location', 'profile_picture', 'joined_at']