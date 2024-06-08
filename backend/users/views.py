from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegistrationSerializer
from .serializers import UserLoginSerializer
from .models import UserProfile


class UserRegistrationView(CreateAPIView):

    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            "success": True,
            "status code": status.HTTP_200_OK,
            "message": "User registered successfully",
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
            "success": True,
            "status code": status.HTTP_200_OK,
            "message": "User logged in successfully",
            "payload": serializer.data
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
            "success": True,
            "status code": status.HTTP_200_OK,
            "message": "User logged in successfully"
        }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)

class UserProfileView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            status_code = status.HTTP_200_OK
            response = {
                "success": True,
                "status code": status_code,
                "message": "User profile fetched successfully",
                "data": [
                    {
                        "name": user_profile.name,
                    }
                ],
            }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                "success": False,
                "status code": status.HTTP_400_BAD_REQUEST,
                "message": "User does not exists",
                "error": str(e),
            }
        return Response(response, status=status_code)
