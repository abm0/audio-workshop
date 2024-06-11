from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('name', 'user')

class UserRegistrationSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50)
    id = serializers.CharField(max_length=32, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'id', 'name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']
        name = validated_data['name']
        
        user = User.objects.create_user(email=email, password=password)
        
        Profile.objects.create_profile(name=name, user=user)
                    
        return user


class UserLoginSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=32, read_only=True)

    email = serializers.CharField(max_length=50, write_only=True)
    password = serializers.CharField(max_length=128, write_only=True)

    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)
        
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError(
                'Неверные данные пользователя'
            )

        try:
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'Неверные данные пользователя'
            )
            
        refresh = RefreshToken.for_user(user)
        
        return {
            'id': str(user.id),
            'email': user.email,
            'access_token': str(refresh.access_token),
            'refresh_token': str(refresh)
        }


class UserDetailSerializer(serializers.ModelSerializer):
    id = serializers.CharField(max_length=32, read_only=True)
    email = serializers.CharField(max_length=50, read_only=True)
    profile = serializers.CharField(max_length=50, read_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'profile', 'id')
