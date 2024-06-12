import os
from django.db.models.signals import pre_delete
from django.dispatch import receiver

from .models import Track

@receiver(pre_delete, sender=Track)
def delete_track_file(sender, instance, **kwargs):
    # Удаление файла из файловой системы при удалении объекта Track
    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)
