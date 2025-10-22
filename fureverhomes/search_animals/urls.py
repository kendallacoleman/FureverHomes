from django.urls import path
from . import views

app_name = 'search_animals'

urlpatterns = [
    path('', views.search_pets, name='search'),
]
