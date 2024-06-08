from django.urls import path
from .views import TrackUploadView, TrackUpdateView

urlpatterns = [
    path("upload", TrackUploadView.as_view(), name="track-upload"),
    path("update", TrackUpdateView.as_view(), name="track-bind-to-user")
]
