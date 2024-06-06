from rest_framework import generics
from .models import UserProfile
from .serializers import UserProfileSerializer
from .permissions import IsCreationOrReadOnly

class UserProfileListCreateAPIView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsCreationOrReadOnly]
