from django.urls import path
from .views import (
    UserRegistrationView,
    UserLoginView,
    UserLogoutView,
)

urlpatterns = [
    path("signup", UserRegistrationView.as_view()),
    path("signin", UserLoginView.as_view()),
    path("signout", UserLogoutView.as_view())
]
