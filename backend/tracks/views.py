import os
from django.http import HttpResponse
from django.conf import settings
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import TrackUploadSerializer, TrackUpdateSerializer, TrackSerializer
from .models import Track
from .scripts.analyse import analyze_track
from .scripts.separate import separate_track

class TrackManageView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request):        
        serializer = TrackUploadSerializer(data=request.data)
        
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

    def put(self, request):
        instance = Track.objects.get(pk=request.data['id'])        
        serializer = TrackUpdateSerializer(instance, data=request.data)
        
        if serializer.is_valid():
            serializer.save()

            status_code = status.HTTP_200_OK
            response = {
                "success": True,
                "status_code": status_code,
                "message": "Трек успешно изменён",
                "payload": serializer.data
            }

            return Response(response, status=status_code)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request):
        track_id = request.query_params.get('id', None)
        
        if track_id is None:
            return Response('Не найден id в параметрах запроса', status=status.HTTP_400_BAD_REQUEST)
        
        track = Track.objects.get(pk=track_id)
        
        if track is None:
            return Response('Трек c таким id не найден', status=status.HTTP_400_BAD_REQUEST)
        
        track.delete()
        
        return Response('Трек успешно удалён', status=status.HTTP_200_OK)

class TrackListView(RetrieveAPIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = TrackSerializer

    def get(self, request):
        user = request.user
        
        user_tracks = Track.objects.all().filter(user_id=user.id)
        
        serializer = TrackSerializer(user_tracks, many=True)
        
        status_code = status.HTTP_200_OK
        response = {
                "success": True,
                "status_code": status_code,
                "message": "Список треков успешно загружен",
                "payload": serializer.data
            }
        
        return Response(response, status=status_code)
    
class TrackProcesingView(RetrieveAPIView):
    
    permission_classes = (IsAuthenticated,)
    serializer_class = TrackSerializer
    
    def post(self, request):
        track_id = request.data.get('id', None)
        
        if track_id is None:
            return Response('Необходимо передать id трека', status.HTTP_400_BAD_REQUEST)
        
        track = Track.objects.get(pk=track_id)
        
        if track is None:
            return Response('Трек с таким id не найден', status.HTTP_400_BAD_REQUEST)
        
                
        file_full_path = os.path.join(settings.MEDIA_PATH, str(track.source_file))
        
        key, tempo = analyze_track(file_full_path)
               
        separated_output = separate_track(file_full_path)
        backing_track_file = separated_output[0]
        vocals_file = separated_output[1]
        
        track.key = key
        track.tempo = tempo
        track.backing_track_file.save(track.title + '_backing_track.mp3', backing_track_file)
        track.vocals_file.save(track.title + '_vocals.mp3', vocals_file)
        track.save()
        
        
        serializer = TrackSerializer(instance=track)
            
        status_code = status.HTTP_200_OK
        response = {
                "success": True,
                "status_code": status_code,
                "message": "Трек успешно изменён",
                "payload": serializer.data
            }
        
        return Response(response, status=status_code)
        
def serve_media(request, file_path):    
    # Проверка безопасности: убедитесь, что запрошенный путь находится внутри MEDIA_ROOT
    file_full_path = os.path.join(settings.MEDIA_PATH, file_path).replace('/', '\\')

    if os.path.abspath(file_full_path).startswith(settings.MEDIA_PATH):
        # Если файл существует, возвращаем его
        if os.path.exists(file_full_path):
            with open(file_full_path, 'rb') as f:
                file_data = f.read()
            return HttpResponse(file_data, content_type='application/octet-stream')
    # В противном случае возвращаем ошибку 404
    return HttpResponse(status=404)