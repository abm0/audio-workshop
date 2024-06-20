from rest_framework import serializers

from .models import Song, Track

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
            'source_track',
            'backing_track',
            'vocals_track'
        )

    def create(self, validated_data):
        song = Song.objects.create_song(data=validated_data)
                
        return song
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        source_tracks = Song.objects.get_source_tracks(instance.id)
        vocals_tracks = Song.objects.get_vocals_tracks(instance.id)
        backing_tracks = Song.objects.get_backing_tracks(instance.id)

        # Представляем треки в соответствующих полях
        representation['source_tracks'] = TrackSerializer(source_tracks, many=True).data if source_tracks else None
        representation['vocals_tracks'] = TrackSerializer(vocals_tracks, many=True).data if vocals_tracks else None
        representation['backing_tracks'] = TrackSerializer(backing_tracks, many=True).data if backing_tracks else None

        return representation
