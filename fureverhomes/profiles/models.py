from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    joined_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.user.username
    
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    petfinder_id = models.CharField(max_length=50) # ID from PetFinder
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} favorites {self.petfinder_id}"