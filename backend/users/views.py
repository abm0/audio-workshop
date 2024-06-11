from tokenize import TokenError
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegistrationSerializer
from .serializers import UserLoginSerializer


class UserRegistrationView(CreateAPIView):
    permission_classes = (AllowAny,)

    serializer_class = UserRegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        response = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': 'Пользователь успешно зарегистрирован',
        }

        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)


class UserLoginView(RetrieveAPIView):
    permission_classes = (AllowAny,)

    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        
        response = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': 'Пользователь успешно авторизован',
            'payload': serializer.data
        }
        
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)
    
class UserLogoutView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if not refresh_token:
            return Response({'error': 'Необходимо передать refresh token'}, status=status.HTTP_400_BAD_REQUEST)

        token = RefreshToken(refresh_token)

        token.blacklist()
        
        response = {
            'success': True,
            'status code': status.HTTP_200_OK,
            'message': 'Авторизация пользователя прекращена'
        }

        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)

class UserRefreshView(RetrieveAPIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')

            if not refresh_token:
                return Response({'detail': 'Необходимо предоставить refresh token'}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)

            return Response(str(token.access_token), status=status.HTTP_200_OK)

        except TokenError as e:
            return Response({'detail': 'Неверный токен'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)