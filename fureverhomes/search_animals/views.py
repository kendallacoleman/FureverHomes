from django.shortcuts import render
from .petfinder_api import PetfinderClient

def search_view(request):
    client = PetfinderClient()

    query = request.GET.get('query', '')
    location = request.GET.get('location', '')
    animal_type = request.GET.get('type', '')

    params = {}
    if query:
        params['name'] = query
    if location:
        params['location'] = location
    if animal_type:
        params['type'] = animal_type

    data = client.search_animals(params) if params else None

    return render(request, 'search_animals/search.html', {
        'animals': data['animals'] if data and 'animals' in data else [],
        'query': query,
        'location': location,
        'animal_type': animal_type,
    })
