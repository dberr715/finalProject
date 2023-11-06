from django.db import models
from django.contrib.auth.models import User  # Import the built-in User model
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    

# Define a custom user model that extends the built-in User model
# class FMUser(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link FMUser to User

#     # Add any additional fields specific to FMUser

#     def __str__(self):
#         return self.user.username

class Favorites(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="favorite_teams"
    )
    team_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.user.username}'s favorite team: {self.team_name}"

    def set_default_user(self):
        return self.user

Favorites._meta.get_field('user').default = Favorites.set_default_user
