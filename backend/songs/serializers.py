import os
import tempfile
from rest_framework import serializers
from .models import Song, Track
from .scripts.analyse import analyze_track
from .scripts.separate import separate_song

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

    def create(self, validated_data):
        source_file = validated_data.pop('source_file')
        temp_source_file_path = self.save_file_temporarily(source_file)
        
        key, tempo = analyze_track(temp_source_file_path)
        
        song_data = {
            'title': validated_data['title'],
            'user': validated_data['user'],
            'key': key,
            'tempo': tempo,
        }
        
        song = Song.objects.create_song(data=song_data)
        
        
        source_data = {
            'song': song.id,
            'file': source_file,
            'extension': 'mp3',
            'type': 'source',
        }
        

        source_serializer = TrackSerializer(data=source_data)
        
        if source_serializer.is_valid():
            source_serializer.save(song=song)
        else:
            print(source_serializer.errors)
            raise serializers.ValidationError({ 'detail': source_serializer.errors })
        

        [backing_track_file, vocals_file] = separate_song(temp_source_file_path)
        os.remove(temp_source_file_path)
        
        backing_track_data = {
            'song': song.id,
            'file': backing_track_file,
            'extension': 'mp3',
            'type': 'backing_track',
        }
        
        backing_track_serializer = TrackSerializer(data=backing_track_data)
        
        if backing_track_serializer.is_valid():
            backing_track_serializer.save(song=song)
        else:
            print(backing_track_serializer.errors)
            raise serializers.ValidationError({ 'detail': backing_track_serializer.errors })
        
                
        vocals_track_data = {
            'song': song.id,
            'file': vocals_file,
            'extension': 'mp3',
            'type': 'vocals',
        }
        
        vocals_serializer = TrackSerializer(data=vocals_track_data)
        
        if vocals_serializer.is_valid():
            vocals_serializer.save(song=song)
        else:
            print(vocals_serializer.errors)
            raise serializers.ValidationError({ 'detail': vocals_serializer.errors })
        
        return song
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        source_track = instance.tracks.filter(type='source').first()
        vocals_track = instance.tracks.filter(type='vocals').first()
        backing_track = instance.tracks.filter(type='backing_track').first()

        # Представляем треки в соответствующих полях
        representation['source_track'] = TrackSerializer(source_track).data['file'] if source_track else None
        representation['vocals_track'] = TrackSerializer(vocals_track).data['file'] if vocals_track else None
        representation['backing_track'] = TrackSerializer(backing_track).data['file'] if backing_track else None

        return representation
