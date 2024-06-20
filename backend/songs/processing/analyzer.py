import librosa

from .file_handler import file_handler

@file_handler
class TrackAnalyzer:
  def __init__(self, source_file):
    self.__source_file = source_file
    
  def analyze_track(self):
    temp_source_file_path = self.create_temp_file(self.__source_file)
    
    # Загрузка аудио файла
    y, sr = librosa.load(temp_source_file_path)
    
    # Определение тональности
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    chroma_mean = chroma.mean(axis=1)
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    key = note_names[chroma_mean.argmax()]

    # Определение BPM
    tempo = librosa.beat.beat_track(y = y, sr = sr)
    bpm, _ = tempo

    self.destroy_temp_file()
    
    return key, bpm[0]
