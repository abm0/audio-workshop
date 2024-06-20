from .file_handler import file_handler
from .separator import TrackSeparator
from .analyzer import TrackAnalyzer

@file_handler
class TrackProcessor:
  def __init__(self, source_file):
    self.source_file = source_file
  
  def get_processed_data(self):
    temp_source_file_path = self.create_temp_file(self.source_file)
    
    analyzer = TrackAnalyzer(source_file=temp_source_file_path)
    separator = TrackSeparator(source_file=temp_source_file_path)
    
    key, tempo = analyzer.analyze_track()
    separated_tracks_tuples = separator.separate_song()

    
    self.destroy_temp_file()
    
    return key, tempo, separated_tracks_tuples
