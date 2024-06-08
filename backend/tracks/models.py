import uuid

from django.db import models
from users.models import User

class TrackManager(models.Manager):
    def upload_track(self, title, source_file):
        if not title or not source_file:
            raise ValueError("Отсутствуют данные трека")

        track = self.model(
          title=title,
          source_file=source_file,
        )
        
        track.save(using=self._db)
        return track
      
    def get_track_by_id(self, track_id):
        """
        Получить трек по его идентификатору.
        """
        return self.get(pk=track_id)

class Track(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    title = models.CharField(max_length=50, unique=False)
    source_file = models.FileField(upload_to='media/uploads/')
    vocals_file = models.FileField(upload_to='media/uploads/', null=True)
    backing_track_file = models.FileField(upload_to='media/uploads/', null=True)
    tempo =  models.IntegerField(unique=False, null=True)
    key = models.CharField(max_length=10, unique=False, null=True)

    objects = TrackManager()
    
    def __str__(self):
      return self.title

    class Meta:
        """
        to set table name in database
        """

        db_table = "tracks"
