from django.urls import path
from .views import PetSearchView

urlpatterns = [
    path('search/', PetSearchView.as_view(), name='search')
]