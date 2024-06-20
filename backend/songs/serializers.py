from rest_framework import serializers

from .models import Song, Track
from .processing.converter import Converter
from .processing.processor import TrackProcessor

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

    def create(self, validated_data):
        source_file = validated_data.pop('source_file')
        
        converter = Converter(source_file=source_file)
        
        source_file_mp3, source_file_wav = converter.get_converted()
        
        tracks_tuples = [
            (source_file_mp3, 'source', 'mp3'),
            (source_file_wav, 'source', 'wav')
        ]
        
        track_processor = TrackProcessor(source_file=source_file)
        
        key, tempo, separated_tracks_tuples = track_processor.get_processed_data()
        
        song_data = {
            'title': validated_data['title'],
            'user': validated_data['user'],
            'key': key,
            'tempo': tempo,
        }
        
        song = Song.objects.create_song(data=song_data)
        
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
