from django.db import models
from django.contrib.auth.models import AbstractUser,User
from .manager import UserManager
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone

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
    CHOICES = [
        ('audi', 'Auditorium'),
        ('sem', 'Seminar hall'), 
    ]
    resource_name = models.CharField(max_length=20, primary_key=True, choices=CHOICES)
    resource_type = models.IntegerField(default=0)
    max_permission = models.IntegerField(default=3, validators=[MaxValueValidator(5), MinValueValidator(3)])
    current_permission = models.IntegerField(default=0)

    def __str__(self):
        return self.resource_name

    
# class Session(models.Model):
#     resource=models.ForeignKey(Resource,on_delete=models.CASCADE)
#     date = models.DateField(default = timezone.now, null = True)
#     start_time=models.DateTimeField(default=timezone.now,null=True)
#     end_time=models.DateTimeField(default=timezone.now,null=True)

#     def __str__(self):
#         return f"{self.resource}: {self.start_time} to {self.end_time}"

class Booking(models.Model):
    booking_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name='bookings')
    date = models.DateField(default=timezone.now, null=True)
    start_time = models.DateTimeField(default=timezone.now, null=True)
    end_time = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        return f"{self.user.email} for {self.resource.resource_name} with id={self.booking_id}"
    
    def save(self, *args, **kwargs):
        # Set the date part of start_time to current date
        self.date = self.start_time.date()
        super().save(*args, **kwargs)