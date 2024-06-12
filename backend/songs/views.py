import os
from django.http import HttpResponse
from django.conf import settings
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import SongSerializer
from .models import Song

class SongView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)

    serializer_class = SongSerializer

    def get(self, request):
        user = request.user
        
        user_songs = Song.objects.get_all_for(user=user)
        
        serializer = self.serializer_class(user_songs, many=True)
        
        status_code = status.HTTP_200_OK
        response = {
                'success': True,
                'status_code': status_code,
                'message': 'Список треков успешно загружен',
                'payload': serializer.data
            }
        
        return Response(response, status=status_code)
    
    def post(self, request):        
        user = request.user
                
        data = {
            'title': request.data['title'],
            'source_file': request.data['source_file'],
            'user': user.id,
        }

        serializer = self.serializer_class(data=data)
        
        if serializer.is_valid():
            serializer.save()
            
            response = {
                'success': True,
                'status_code': status.HTTP_200_OK,
                'message': 'Трек успешно загружен',
                'payload': serializer.data
            }

            status_code = status.HTTP_200_OK

            return Response(response, status=status_code)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        song_id = request.query_params.get('id')
        
        if not song_id:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': False,
                'status_code': status_code,
                'message': 'Необходимо передать параметр id',
            }        
            
            return Response(response, status_code)
        
        song = Song.objects.get(pk=song_id)
        song.delete()

        status_code = status.HTTP_200_OK

        response = {
            'success': True,
            'status_code': status_code,
            'message': 'Трек успешно удалён',
            'payload': {
                'id': song_id
            }
        }   
        
        return Response(response, status_code)

def serve_media(request, file_path):
    file_full_path = os.path.join(settings.MEDIA_PATH, file_path).replace('/', '\\')

    if os.path.abspath(file_full_path).startswith(settings.MEDIA_PATH):

        if os.path.exists(file_full_path):
            with open(file_full_path, 'rb') as f:
                file_data = f.read()
            return HttpResponse(file_data, content_type='application/octet-stream')

    return HttpResponse(status=404)