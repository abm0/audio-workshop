from django.http import HttpResponse
from django.conf import settings
import os
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import TrackUploadSerializer, TrackUpdateSerializer, TrackSerializer
from .models import Track

class TrackUploadView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = TrackUploadSerializer

    def post(self, request):        
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            track = serializer.save()

            response = {
                "success": True,
                "status_code": status.HTTP_200_OK,
                "message": "Трек успешно загружен",
                "payload": {
                  "track_id": track.id
                }
            }
            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TrackUpdateView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = TrackUpdateSerializer

    def post(self, request):
        instance = Track.objects.get(pk=request.data['id'])        
        serializer = self.get_serializer(instance, data=request.data)
        
        if serializer.is_valid():
            track = serializer.save()

            response = {
                "success": True,
                "status_code": status.HTTP_200_OK,
                "message": "Трек успешно изменён",
                "payload": {
                    "id": track.id,
                    "user_id": track.user_id,
                    "title": track.title,
                }
            }
            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TrackListView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = TrackSerializer

    def get(self, request):
        user = request.user
        
        user_tracks = Track.objects.all().filter(user_id=user.id)
        
        serializer = TrackSerializer(user_tracks, many=True)
        
        response = {
                "success": True,
                "status_code": status.HTTP_200_OK,
                "message": "Список треков успешно загружен",
                "payload": serializer.data
            }
        status_code = status.HTTP_200_OK
        
        return Response(response, status=status_code)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_PATH = os.path.join(BASE_DIR, settings.MEDIA_ROOT)

def serve_media(request, file_path):    
    # Проверка безопасности: убедитесь, что запрошенный путь находится внутри MEDIA_ROOT
    file_full_path = os.path.join(MEDIA_PATH, file_path).replace('/', '\\')

    if os.path.abspath(file_full_path).startswith(MEDIA_PATH):
        # Если файл существует, возвращаем его
        if os.path.exists(file_full_path):
            with open(file_full_path, 'rb') as f:
                file_data = f.read()
            return HttpResponse(file_data, content_type='application/octet-stream')
    # В противном случае возвращаем ошибку 404
    return HttpResponse(status=404)