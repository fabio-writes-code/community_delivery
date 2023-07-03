from django.shortcuts import render
from django.conf import settings

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer

import os


class HomePage(viewsets.GenericViewSet):
  renderer_classes = [TemplateHTMLRenderer]
  template_name = 'index.html'

  def list(self, request):
    username = self.request.query_params.get('username')
    map_key = settings.MAP_KEY
    return Response({'username': username, 'map_key': map_key})

# Create your views here.
