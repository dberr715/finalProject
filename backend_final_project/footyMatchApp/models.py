from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)


class Favorites(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="favorite_teams"
    )
    team_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.user.username}'s favorite team: {self.team_name}"

    def set_default_user(self):
        return self.user


Favorites._meta.get_field("user").default = Favorites.set_default_user
