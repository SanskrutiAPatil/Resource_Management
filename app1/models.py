from django.db import models
from django.contrib.auth.models import AbstractUser,User
from .manager import UserManager

# Create your models here.
class User(AbstractUser):
    username=None
    email=models.EmailField(unique=True)
    is_verified=models.BooleanField(default=False)
    otp=models.CharField(max_length=6)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]
    objects=UserManager()

    def __str__(self):
        return self.email

   
   