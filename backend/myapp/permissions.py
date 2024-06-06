from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsCreationOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Разрешаем любой доступ для GET, HEAD, OPTIONS запросов
        if request.method in SAFE_METHODS:
            return True
        # Разрешаем доступ только для POST запросов на создание пользователя
        return request.method == 'POST'
