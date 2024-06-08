from django.urls import path
from .views import TrackUploadView

urlpatterns = [
    path("upload", TrackUploadView.as_view(), name="track-upload")
]
