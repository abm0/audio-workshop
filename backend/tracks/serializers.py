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
    id = serializers.CharField(required=False, read_only=True)
    title = serializers.CharField(required=False)
    user_id = serializers.CharField(required=False)
    
    source_file = serializers.FileField(required=False)
    vocals_file = serializers.FileField(required=False)
    backing_track_file = serializers.FileField(required=False)
    tempo = serializers.IntegerField(required=False)
    tempo = serializers.CharField(required=False)
  
    class Meta:
      model = Track
      fields = '__all__'
      
    def update(self, instance, validated_data):
      instance.user_id = validated_data.get('user_id', instance.user_id)
      instance.title = validated_data.get('title', instance.title)
      
      instance.save()
      
      return instance
    
# class TrackSerializer(serializers.ModelSerializer):
  
#   class Meta:
#       model = Track
#       fields = '__all__'