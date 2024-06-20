import uuid

from django.db import models
from users.models import User

class SongManager(models.Manager):
    def get_all_for(self, user):
      if not user:
        raise ValueError('Нужно указать пользователя для получения списка песен')

      return self.filter(user_id=user.id)
  
    def create_song(self, data):
        song = self.model(**data)
        
        song.save(using=self._db)

        return song
      
    def get_track_by_id(self, track_id):
        return self.get(pk=track_id)
      
    def get_source_tracks(self, song_id):
      return self.get(id=song_id).tracks.filter(type='source')
      
    def get_vocals_tracks(self, song_id):
      return self.get(id=song_id).tracks.filter(type='vocals')

    def get_backing_tracks(self, song_id):
      return self.get(id=song_id).tracks.filter(type='accompaniment')

class Song(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    tempo = models.IntegerField(unique=False, null=True)
    key = models.CharField(max_length=10, unique=False, null=True)

    objects = SongManager()
    
    def __str__(self):
      return self.title

    class Meta:
        db_table = 'songs'
        
        constraints = [
            models.UniqueConstraint(fields=['user', 'title'], name='unique_song_for_user')
        ]

class TrackManager(models.Manager):
  def create_track(self, data):
    track = self.model(**data)
    
    track.save(using=self._db)
    
    return track

class Track(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name='tracks')
  file = models.FileField(upload_to='uploads/')
  extension = models.CharField(max_length=10)
  type = models.CharField(max_length=20)
  
  objects = TrackManager()
  
  def __str__ (self):
    return self.file
  
  class Meta:
    db_table = 'tracks'
  