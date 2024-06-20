import librosa

class TrackAnalyzer:
  def __init__(self, source_file):
    self.__source_file = source_file
    
  def analyze_track(self):
    # Загрузка аудио файла
    y, sr = librosa.load(self.__source_file)
    
    # Определение тональности
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    chroma_mean = chroma.mean(axis=1)
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    key = note_names[chroma_mean.argmax()]

    # Определение BPM
    tempo = librosa.beat.beat_track(y = y, sr = sr)
    bpm, _ = tempo
    
    return key, bpm[0]
