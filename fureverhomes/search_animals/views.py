from .serializers import PetSerializer
from .models import Pet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

# @api_view(['GET'])
# def search_pets(request):
#     query = request.GET.get('q', '')
#     pets = Pet.objects.filter(name__icontains=query)
#     serializer = PetSerializer(pets, many=True)
#     return Response(serializer.data)

def search_pets(request):
    return render(request, 'search_animals/search.html')