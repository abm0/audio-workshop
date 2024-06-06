from rest_framework import generics
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileListCreateAPIView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
