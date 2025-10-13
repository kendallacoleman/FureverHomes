import requests
from django.conf import settings
import time

class PetfinderClient:
    BASE_URL = "https://api.petfinder.com/v2"

    def __init__(self):
        self.client_id = settings.PETFINDER_CLIENT_ID
        self.client_secret = settings.PETFINDER_CLIENT_SECRET
        self.token = None
        self.token_expires = 0

    def get_token(self):
        # fetch a new OAuth2 token from PetFinder
        if self.token and time.time() < self.token_expires:
            return self.token
        
        response = requests.post(
            f"{self.BASE_URL}/oauth2/token",
            data={
                "grant_type": "client_credentials",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
            },
        )

        data = response.json()
        self.token = data["access_token"]
        self.token_expires = time.time() + data["expires_in"] - 60
        return self.token
    
    def search_animals(self, query_params):
        # search animals using PetFinder API
        token = self.get_token()
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{self.BASE_URL}/animals", headers=headers, params=query_params)
        return response.json()
    
    def get_animal(self, animal_id):
        # get details about a specific animal
        token = self.get_token()
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{self.BASE_URL}/animals/{animal_id}", headers=headers)
        return response.json()
        