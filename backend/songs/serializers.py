import os
import tempfile
from rest_framework import serializers
from pydub import AudioSegment
from io import BytesIO
from django.core.files import File

from .models import Song, Track
from .scripts.analyse import analyze_track
from .scripts.separate import separate_song

track_type_rename_map = {
    'accompaniment': 'backing_track',
}

class TrackSerializer(serializers.ModelSerializer):
    
    class Meta:
      model = Track
      fields = (
            'song',
            'file',
            'extension',
            'type',
        )
    
    def create(self, validated_data):
        return Track.objects.create_track(data=validated_data)


class SongSerializer(serializers.ModelSerializer):
    source_file = serializers.FileField(write_only=True)
    source_track = TrackSerializer(read_only=True)
    vocals_track = TrackSerializer(read_only=True)
    backing_track = TrackSerializer(read_only=True)

    class Meta:
        model = Song
        fields = (
            'id',
            'title',
            'user',
            'key',
            'tempo',
            'source_file',
            'source_track',
            'backing_track',
            'vocals_track'
        )
        
    def validate(self, data):
        return data

    def save_file_temporarily(self, file):
        temp_dir = tempfile.gettempdir()
        temp_file_path = os.path.join(temp_dir, file.name)

        with open(temp_file_path, 'wb+') as temp_file:
            for chunk in file.chunks():
                temp_file.write(chunk)

        return temp_file_path
    
    def convert_mp3_to_wav(self, file_path):
        formatted_file_path = file_path.replace('.mp3', '.wav')
        file_name = os.path.split(formatted_file_path)[1]
        
        audio = AudioSegment.from_mp3(file_path)

        audio.export(formatted_file_path, format="wav")
        
        with open(formatted_file_path, 'rb') as f:
            file_content = BytesIO(f.read())
            django_file = File(file_content, name=file_name)

            return django_file
        
    def convert_wav_to_mp3(self, file_path):
        formatted_file_path = file_path.replace('.wav', '.mp3')
        file_name = os.path.split(formatted_file_path)[1]

        audio = AudioSegment.from_wav(file_path)

        audio.export(formatted_file_path, format="mp3")
        
        with open(formatted_file_path, 'rb') as f:
            file_content = BytesIO(f.read())
            django_file = File(file_content, name=file_name)

            return django_file

    def create(self, validated_data):
        source_file = validated_data.pop('source_file')
        source_extension = os.path.splitext(source_file.name)[1].replace('.', '')

        temp_source_file_path = self.save_file_temporarily(source_file)
        
        
        source_file_mp3 = None
        source_file_wav = None
                
        if source_extension == 'mp3':
            source_file_mp3 = source_file
            source_file_wav = self.convert_mp3_to_wav(temp_source_file_path)
            
        elif source_extension == 'wav':
            source_file_wav = source_file
            source_file_mp3 = self.convert_wav_to_mp3(temp_source_file_path)
        
        tracks_tuples = [
            (source_file_mp3, 'source', 'mp3'),
            (source_file_wav, 'source', 'wav')
        ]
        
        key, tempo = analyze_track(temp_source_file_path)
        
        song_data = {
            'title': validated_data['title'],
            'user': validated_data['user'],
            'key': key,
            'tempo': tempo,
        }
        
        song = Song.objects.create_song(data=song_data)

        separated_tracks_tuples = separate_song(temp_source_file_path)
        os.remove(temp_source_file_path)
        
        tracks_tuples.extend(separated_tracks_tuples)
        
        for file, type, extension in tracks_tuples:
            data = {
                'song': song.id,
                'file': file,
                'type': track_type_rename_map.get(type, type),
                'extension': extension
            }
            
            serializer = TrackSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save(song=song)
            else:
                print(serializer.errors)
                raise serializers.ValidationError({ 'detail': serializer.errors })
                
        return song
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        source_tracks = instance.tracks.filter(type='source')
        vocals_tracks = instance.tracks.filter(type='vocals')
        backing_tracks = instance.tracks.filter(type='backing_track')

        # Представляем треки в соответствующих полях
        representation['source_tracks'] = TrackSerializer(source_tracks, many=True).data if source_tracks else None
        representation['vocals_tracks'] = TrackSerializer(vocals_tracks, many=True).data if vocals_tracks else None
        representation['backing_tracks'] = TrackSerializer(backing_tracks, many=True).data if backing_tracks else None

        return representation
