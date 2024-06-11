from django.urls import path
from .views import serve_media, SongView

urlpatterns = [
    path('', SongView.as_view(), name="song"),
    path("media/<path:file_path>", serve_media, name='serve-media'),
]
