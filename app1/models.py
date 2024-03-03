from django.db import models
from django.contrib.auth.models import AbstractUser,User
from .manager import UserManager
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
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

class Resource(models.Model):
    CHOICE = [
        ('audi', 'Auditorium'),
        ('sem', 'Seminar hall'),   
    ]
    resource=models.CharField(max_length=20,unique=True,choices=CHOICE)
    resource_type = models.IntegerField()

    def __str__(self):
        return self.resource
    
class Session(models.Model):
    # id = models.IntegerField
    resource=models.ForeignKey(Resource,on_delete=models.CASCADE)
    date = models.DateField(default = timezone.now, null = True)
    start_time=models.DateTimeField(default=timezone.now,null=True)
    end_time=models.DateTimeField(default=timezone.now,null=True)

    def __str__(self):
        return f"{self.resource}: {self.start_time} to {self.end_time}"

class Booking(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    resource=models.ForeignKey(Resource,on_delete=models.CASCADE)
    session = models.OneToOneField(Session,on_delete=models.CASCADE)

    def __str__(self):
        return self.user