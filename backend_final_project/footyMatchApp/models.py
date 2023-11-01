from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class FMUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.CharField(default="No Favorites Set")

    def __str__(self):
        return self.user.username
