from django.urls import path
from .views import (
    UserRegistrationView,
    UserLoginView,
    UserLogoutView,
    UserRefreshView,
    UserDetailsView
)

urlpatterns = [
    path('signup', UserRegistrationView.as_view()),
    path('signin', UserLoginView.as_view()),
    path('signout', UserLogoutView.as_view()),
    path('details', UserDetailsView.as_view()),
    path('refresh', UserRefreshView.as_view())
]
