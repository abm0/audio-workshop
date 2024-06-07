from spleeter.separator import Separator

# Создать объект разделителя
# без multiprocess=False выдаёт ошибку в spawn.py
separator = separator = Separator('spleeter:2stems', multiprocess=False)  # 2stems разделяет на вокал и инструментал

# Разделить аудио файл
separator.separate_to_file('track2.mp3', '.')