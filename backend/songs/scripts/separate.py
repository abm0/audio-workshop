from os import path
from spleeter.separator import Separator
from spleeter.audio import Codec
from django.core.files import File
from io import BytesIO
import shutil

def separate_song(file_path):
  output_path = path.splitext(file_path)[0]
  source_file_name_with_extension = path.split(file_path)[1]
  source_file_name = path.splitext(source_file_name_with_extension)[0]

  separator = Separator('spleeter:2stems', multiprocess=False)
    
  output_file_names = [
    'accompaniment.mp3',
    'vocals.mp3',
    'accompaniment.wav',
    'vocals.wav'
  ]
  
  separator.separate_to_file(file_path, output_path, codec=Codec.MP3, filename_format="{instrument}.{codec}")
  separator.separate_to_file(file_path, output_path, codec=Codec.WAV, filename_format="{instrument}.{codec}")
  
  files = []
  
  for output_file in output_file_names:
    try:
      with open(path.join(output_path, output_file), 'rb') as f:
        file_content = BytesIO(f.read())

        track_type = path.splitext(output_file)[0]
        extension = path.splitext(output_file)[1].replace('.', '')
        
        name_with_source_prefix = source_file_name + '_' + output_file

        django_file = File(file_content, name=name_with_source_prefix)

        files.append((django_file, track_type, extension))
    except Exception as e:
      raise e
    
  shutil.rmtree(output_path)
    
  return files
        