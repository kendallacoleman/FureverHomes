from django.urls import path
from . import views

urlpatterns = [
    path('<int:animal_id>/', views.detail_view, name='animal_detail'),
]
