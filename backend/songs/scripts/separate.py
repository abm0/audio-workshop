import os
from spleeter.separator import Separator
from spleeter.audio import Codec
from django.core.files import File
from io import BytesIO
import shutil

def separate_song(file_path):
  output_path = os.path.splitext(file_path)[0]
  separator = Separator('spleeter:2stems', multiprocess=False)
    
  output_file_names = [
    'accompaniment.mp3',
    'vocals.mp3'
  ]
  
  separator.separate_to_file(file_path, output_path, codec=Codec.MP3, filename_format="{instrument}.{codec}")
  
  files = []
  
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
        