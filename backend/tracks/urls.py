from django.urls import path
from .views import TrackManageView, TrackListView, TrackProcesingView, serve_media

urlpatterns = [
    path("manage", TrackManageView.as_view(), name="track-manage"),
    path("list", TrackListView.as_view(), name="track-list"),
    path("media/<path:file_path>", serve_media, name='serve-media'),
    path("processing", TrackProcesingView.as_view(), name="track-process")
]
