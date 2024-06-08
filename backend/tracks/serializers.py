from rest_framework import serializers
from .models import Track

class TrackUploadSerializer(serializers.ModelSerializer):
    class Meta:
      model = Track
      fields = ("title", "source_file")
      
    def create(self, validated_data):
        track = Track.objects.upload_track(**validated_data)
        
        return track

class TrackUpdateSerializer(serializers.ModelSerializer):
    class Meta:
      model = Track
      fields = ("title", "user_id")
      
      
    def update(self, instance, validated_data):
      instance.user_id = validated_data.get('user_id', instance.user_id)
      instance.title = validated_data.get('title', instance.title)
      
      instance.save()
      
      return instance