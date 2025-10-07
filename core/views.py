from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    return HttpResponse(render(request, 'core/home.html', {}))
def about(request):
    return HttpResponse(render(request, 'core/about.html', {}))
