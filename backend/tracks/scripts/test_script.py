import os

try:
  with open('D:\\Dev\\audio-splitter\\backend\\media\\uploads/track\\accompaniment.mp3', 'rb') as f:
    print(f)
except Exception as e:
  raise(e)