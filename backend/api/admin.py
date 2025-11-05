from django.contrib import admin
from .models import Profile, Favorite, Comment

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "bio")
    search_fields = ("user__username",)

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ("user", "pet_name", "pet_id", "created_at")
    search_fields = ("user__username", "pet_name", "pet_id")

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("user", "pet_id", "text", "created_at")
    search_fields = ("user__username", "pet_id", "text")
