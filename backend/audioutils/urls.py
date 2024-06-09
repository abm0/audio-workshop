from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("users.urls")),
    # path("auth/token-refresh/", refresh_jwt_token),
    path("track/", include("tracks.urls"))
]
