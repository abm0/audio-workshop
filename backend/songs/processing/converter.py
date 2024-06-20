from pydub import AudioSegment
import os
from io import BytesIO
from django.core.files import File

from .file_handler import file_handler

@file_handler
class Converter:
  def __init__(self, source_file):
    self.source_file = source_file
  
  
  def convert_mp3_to_wav(self, file_path):
      formatted_file_path = file_path.replace('.mp3', '.wav')
      file_name = os.path.split(formatted_file_path)[1]
      
      audio = AudioSegment.from_mp3(file_path)

      audio.export(formatted_file_path, format="wav")
      
      with open(formatted_file_path, 'rb') as f:
          file_content = BytesIO(f.read())
          django_file = File(file_content, name=file_name)

          return django_file
      
  def convert_wav_to_mp3(self, file_path):
      formatted_file_path = file_path.replace('.wav', '.mp3')
      file_name = os.path.split(formatted_file_path)[1]

      audio = AudioSegment.from_wav(file_path)

      audio.export(formatted_file_path, format="mp3")
      
      with open(formatted_file_path, 'rb') as f:
          file_content = BytesIO(f.read())
          django_file = File(file_content, name=file_name)

          return django_file
    
  def get_converted(self):
    source_extension = os.path.splitext(self.source_file.name)[1].replace('.', '')
    
    temp_source_file_path = self.create_temp_file(self.source_file)
    
    source_file_mp3 = None
    source_file_wav = None
            
    if source_extension == 'mp3':
        source_file_mp3 = self.source_file
        source_file_wav = self.convert_mp3_to_wav(temp_source_file_path)
        
    elif source_extension == 'wav':
        source_file_wav = self.source_file
        source_file_mp3 = self.convert_wav_to_mp3(temp_source_file_path)

    self.destroy_temp_file()
        
    return source_file_mp3, source_file_wav