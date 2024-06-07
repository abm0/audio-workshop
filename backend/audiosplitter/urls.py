from django.urls import path
from . import views

urlpatterns = [ 
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('users/', views.UserProfileListCreateAPIView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', views.UserProfileDetailAPIView.as_view(), name='user-detail'),
]
