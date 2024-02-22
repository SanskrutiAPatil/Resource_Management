from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['email','is_verified'] 

class VerifyAccountSerializer(serializers.Serializer):
    email=serializers.EmailField()
    otp=serializers.CharField()

# class PasswordResetSerializer(serializers.Serializer):
#     email=serializers.EmailField()
#     password=serializers.CharField()

# from django.contrib.auth.password_validation import validate_password

class ChangePasswordSerializer(serializers.Serializer):
   
    gmail = serializers.EmailField(required=True)
    # new_password = serializers.CharField(required=True)
    

    # def create(self, validated_data):
    #     return User.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     return User.objects.update(instance, validated_data)
    