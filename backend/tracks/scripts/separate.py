import os
from spleeter.separator import Separator
from spleeter.audio import Codec
from django.core.files import File
from django.conf import settings
from io import BytesIO
import shutil

def separate_track(file_path):
  separator = Separator('spleeter:2stems', multiprocess=False)
    
  output_file_names = [
    'accompaniment.mp3',
    'vocals.mp3'
  ]
  
  separator.separate_to_file(file_path, settings.UPLOADS_PATH, codec=Codec.MP3)
  
  files = []
  output_path = os.path.splitext(file_path)[0]
  
  for output_file in output_file_names:
    try:
      with open(os.path.join(output_path, output_file), 'rb') as f:
        file_content = BytesIO(f.read())
        django_file = File(file_content, name=output_file)
        files.append(django_file)
    except Exception as e:
      raise e
    
  shutil.rmtree(output_path)
    
  return files
        