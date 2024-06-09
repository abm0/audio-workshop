from rest_framework import serializers, validators
from .models import Track

class TrackUploadSerializer(serializers.ModelSerializer):
    class Meta:
      model = Track
      fields = ("title", "source_file")
      extra_kwargs = {
            'title': {
                'validators': [
                    validators.UniqueValidator(
                        queryset=Track.objects.all(),
                        message="Это значение уже используется. Пожалуйста, выберите другое."
                    )
                ]
            }
        }
      
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
    key = serializers.CharField(required=False)
  
    class Meta:
      model = Track
      fields = '__all__'
      
    def update(self, instance, validated_data):
      instance.user_id = validated_data.get('user_id', instance.user_id)
      instance.title = validated_data.get('title', instance.title)
      instance.tempo = validated_data.get('tempo', instance.tempo)
      instance.key = validated_data.get('key', instance.key)
      instance.vocals_file = validated_data.get('vocals_file', instance.vocals_file)
      instance.backing_track_file = validated_data.get('backing_track_file', instance.backing_track_file)
      
      instance.save()
      
      return instance
    
class TrackSerializer(serializers.ModelSerializer):
  
  class Meta:
      model = Track
      fields = '__all__'