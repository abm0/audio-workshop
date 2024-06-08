from rest_framework import serializers
from .models import Track

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
      model = Track
      fields = ("title", "source_file")
      
    def create(self, validated_data):
        title = validated_data['title']
        source_file = validated_data['source_file']
      
        track = Track.object.create_track(title=title, source_file=source_file)
        
        return track