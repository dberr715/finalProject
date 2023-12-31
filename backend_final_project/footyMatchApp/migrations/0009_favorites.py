# Generated by Django 4.2.6 on 2023-11-03 14:57

from django.db import migrations, models
import django.db.models.deletion
import footyMatchApp.models


class Migration(migrations.Migration):

    dependencies = [
        ('footyMatchApp', '0008_auto_20231103_0911'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorites',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team_name', models.CharField(max_length=100)),
                ('user', models.ForeignKey(default=footyMatchApp.models.Favorites.set_default_user, on_delete=django.db.models.deletion.CASCADE, related_name='favorite_teams', to='footyMatchApp.fmuser')),
            ],
        ),
    ]
