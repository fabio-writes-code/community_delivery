from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import WishlistSerializer
from .models import Wishlist

from .services import create_wishlist, get_wishlist, update_wishlist

# Create your views here.


class WishlistView(viewsets.ModelViewSet):
  queryset = Wishlist.objects.all()
  serializer_class = WishlistSerializer

  def create(self, request):
    buyer = self.request.data.get('buyer')
    items = self.request.data.get('items')
    store = int(self.request.data.get('store'))

    wishlist = create_wishlist(buyer, items, store)
    wishlist_data = WishlistSerializer(wishlist, many=False)

    return Response(wishlist_data.data)

  def list(self, request):
    latitude = self.request.query_params.get('lat')
    longitude = self.request.query_params.get('lng')
    options = {}
    for key in ('buyer', 'wishholder'):
      value = self.request.query_params.get('key')
      if value:
        options[key] = value

    wishlist = get_wishlist(
      float(latitude),
      float(longitude),
      options
    )

    wishlist_data = WishlistSerializer(wishlist, many=True)
    return Response(wishlist_data.data)

  def partial_update(self, request, pk):
    print('Patching')
    print(self.request)
    wishlist = update_wishlist(
      pk=pk,
      wishholder=self.request.data.get('wishholder'),
      status=self.request.data.get('status')
    )
    wishlist_data = WishlistSerializer(wishlist, many=False)
    return Response(wishlist_data.data)
