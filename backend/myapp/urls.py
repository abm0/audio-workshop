from django.urls import path
from .views import UserProfileListCreateAPIView

urlpatterns = [
    path('users/', UserProfileListCreateAPIView.as_view(), name='user-list-create'),
]
