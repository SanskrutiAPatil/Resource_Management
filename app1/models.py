from django.db import models
from django.contrib.auth.models import AbstractUser,User
from .manager import UserManager
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class User(AbstractUser):
    username=None
    email=models.EmailField(unique=True)
    is_verified=models.BooleanField(default=False)
    otp=models.CharField(max_length=6, null=True)

    is_admin = models.BooleanField(default=False)
    neumericRoleLevel = models.IntegerField(default=0, validators=[MaxValueValidator(5),MinValueValidator(0)])
    role = models.CharField(max_length=50, null=True)
    club_name = models.CharField(max_length=50, null=True)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=[]
    objects=UserManager()
    

    def __str__(self):
        return self.email
