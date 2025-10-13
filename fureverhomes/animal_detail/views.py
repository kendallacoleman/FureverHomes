from django.shortcuts import render
from search_animals.petfinder_api import PetfinderClient

def detail_view(request, animal_id):
    client = PetfinderClient()
    data = client.get_animal(animal_id)
    animal = data.get('animal', None)

    return render(request, 'animal_detail/detail.html', {
        'animal': animal
    })
