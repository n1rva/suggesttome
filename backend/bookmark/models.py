from django.conf import settings
from django.db import models
from django.contrib.auth.models import User


class Recommender(models.TextChoices):
    Book = 'Book'
    Movie = 'Movie'
    Music = 'Music'


class Bookmark(models.Model):
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE, unique=False)
    # user = models.CharField(max_length=100)
    category = models.CharField(
        max_length=10, choices=Recommender.choices, default=Recommender.Movie)
    image = models.CharField(max_length=300)
    title = models.CharField(max_length=100)
    explanation = models.CharField(max_length=1000)
