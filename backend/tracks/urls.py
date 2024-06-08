from django.urls import path
from .views import TrackUploadView, TrackUpdateView, TrackListView, serve_media

urlpatterns = [
    path("upload", TrackUploadView.as_view(), name="track-upload"),
    path("update", TrackUpdateView.as_view(), name="track-bind-to-user"),
    path("list", TrackListView.as_view(), name="track-list"),
    path("media/<path:file_path>", serve_media, name='serve-media')
]
