from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField()
    password = models.CharField()
    token = models.CharField()
    favorites = models.CharField(default="No Favorites Set")

    def __str__(self):
        return self.username
