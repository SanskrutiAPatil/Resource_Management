from rest_framework import serializers
from .models import *
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['email','is_verified'] 

class VerifyOTPSerializer(serializers.Serializer):
    mail=serializers.EmailField()
    otp=serializers.CharField()
    new_password = serializers.CharField(required = True)


class PasswordSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField()

# from django.contrib.auth.password_validation import validate_password

class EmailVerificationSerializer(serializers.Serializer):
   
    mail = serializers.EmailField(required=True)

class AdminAddSerializer(serializers.Serializer):
    
    mail = serializers.EmailField(required=True)
    role = serializers.IntegerField(required=True)
    club_name = serializers.CharField(required=False,default=None,allow_null=True)
    
class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = '__all__'
    
    date = serializers.DateField(default=timezone.now, required=False)
    start_time=serializers.DateTimeField(default=timezone.now)
    end_time=serializers.DateTimeField(default=timezone.now)

class Getdate(serializers.Serializer):
    date=serializers.DateField(default=timezone.now().date())
    
