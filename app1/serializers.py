from rest_framework import serializers
from .models import User

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
    club_name = serializers.CharField(required=False)
    