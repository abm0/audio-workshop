from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileListCreateAPIView(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [SessionAuthentication]
    
    def get_permissions(self):
        if self.request.method == 'POST':
            # Разрешаем доступ для неавторизованных пользователей только для метода POST
            return [AllowAny()]
        else:
            # Для всех остальных методов требуем аутентификацию
            return [IsAuthenticated()]