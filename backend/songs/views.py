import os
from django.http import HttpResponse
from django.conf import settings
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

from .serializers import SongSerializer, TrackSerializer
from .models import Song
from .processing.converter import Converter
from .processing.analyzer import TrackAnalyzer
from .processing.separator import TrackSeparator

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
        
        source_file = request.data['source_file']
        
        analyzer = TrackAnalyzer(source_file=source_file)
        converter = Converter(source_file=source_file)
        separator = TrackSeparator(source_file=source_file)

        key, tempo = analyzer.analyze_track()
                        
        data = {
            'title': request.data['title'],
            'user': user.id,
            'tempo': int(tempo),
            'key': key,
        }

        song_serializer = self.serializer_class(data=data)
        
        if song_serializer.is_valid():
            try:
                song = song_serializer.save()
                                
                source_file_mp3, source_file_wav = converter.get_converted()
        
                tracks_tuples = [
                    (source_file_mp3, 'source', 'mp3'),
                    (source_file_wav, 'source', 'wav')
                ]
                
                separated_tracks_tuples = separator.separate_song()
                tracks_tuples.extend(separated_tracks_tuples)
                
                for file, type, extension in tracks_tuples:
                    data = {
                        'song': song.id,
                        'file': file,
                        'type': type,
                        'extension': extension
                    }
                    
                    track_serializer = TrackSerializer(data=data)
                    
                    if track_serializer.is_valid():
                        track_serializer.save(song=song)
                    else:
                        print(track_serializer.errors)
                        raise serializers.ValidationError({ 'detail': song_serializer.errors })
                
                response = {
                    'success': True,
                    'status_code': status.HTTP_200_OK,
                    'message': 'Трек успешно загружен',
                    'payload': song_serializer.data
                }

                status_code = status.HTTP_200_OK

                return Response(response, status=status_code)
            except serializers.ValidationError:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(song_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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