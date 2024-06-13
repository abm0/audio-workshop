# Audio Workshop

Приложение для анализа и разделения композиций на вокальную и инструментальную дорожки.

## Начало работы

### Предварительные требования

- Python 3.8.10
- node 20.14.0

### Установка и настройка

#### Сервер:

Установите Python зависимости:
```sh
cd ./backend
pip install -r requirements.txt
```

Выполните миграции БД
```sh
python manager.py migrate
```

#### Клиент:

Установите npm пакеты:
```sh
cd ./frontent
npm install
```

### Запуск

#### Сервер:
```sh
cd ./backend
python manage.py runserver 
```

#### Клиент:
```sh
cd ./frontend
npm run start
```