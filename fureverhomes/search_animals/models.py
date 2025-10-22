from django.db import models

class Pet(models.Model):
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=50)
    age = models.IntegerField()
    location = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='pets/', blank=True, null=True)

    def __str__(self):
        return self.name
