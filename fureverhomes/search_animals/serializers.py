from rest_framework import serializers
from .models import Pet  # make sure you have a Pet model

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'species', 'age', 'location', 'profile_picture']
