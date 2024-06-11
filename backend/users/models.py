import uuid

from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Необходимо указать email пользователя")

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        if password is None:
            raise TypeError("Superusers must have a password.")

        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
    
    def get_profile(self):
        return self.profile
    
    def get_songs(self):
        return self.songs.all()


class User(AbstractBaseUser):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(
        verbose_name="email address", max_length=50, unique=True
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        db_table = "users"


class ProfileManager(models.Manager):
    def create_profile(self, name, user):
        if not name:
            raise ValueError("Необходимо указать имя пользователя")
        
        if not user:
            raise ValueError("Необходимо указать id пользователя для создания профиля")
        
        profile = self.create(name=name, user=user)
        
        return profile

class Profile(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile"
    )
    name = models.CharField(max_length=50, unique=False)

    objects = ProfileManager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "profiles"
