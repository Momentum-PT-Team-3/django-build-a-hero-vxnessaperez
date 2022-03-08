from django.core import serializers
from django.shortcuts import render
from django.http import JsonResponse
from .forms import HeroForm
from myapi.models import Hero


# Create your views here.
def index(request):
    # return render(request, 'home.html')
    hero_form = HeroForm()
    return render(request, "home.html", {'hero_form': hero_form})
