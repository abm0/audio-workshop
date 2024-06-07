import librosa

def analyze_audio(file_path):
    # Загрузка аудио файла
    y, sr = librosa.load(file_path)
    
    # Определение тональности
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    chroma_mean = chroma.mean(axis=1)
    note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    key = note_names[chroma_mean.argmax()]

    # Определение BPM
    tempo = librosa.beat.beat_track(y = y, sr = sr)
    
    return key, tempo

if __name__ == "__main__":
    file_path = "./track.mp3"
    key, bpm = analyze_audio(file_path)
    print(f"Тональность: {key}")
    print(f"BPM: {bpm}")