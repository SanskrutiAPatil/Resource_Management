from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .emails import *
# Create your views here.

# class RegisterAPI(APIView):
#     def post(self,request):
#         try:
#             data=request.data
#             serializer=PasswordResetSerializer(data=data)
#             if serializer.is_valid():
#                 user_mail=User.objects.filter(email=serializer.validated_data['email'])
#                 if user_mail:
#                     serializer.save()
#                     print("account exists")
#                     send_otp_via_email(serializer.data['email'])
#                     return Response({
#                         'status':200,
#                         'message':'please check mail',
#                         'data':serializer.data, 
#                     })
                
            
#                 return Response({
#                     'status':400,
#                     'message':'something went wrong',
#                     'data':'Account with this mail does not exist',

#                 })
#             # print("87909")
#             return Response({
#                     'status':400,
#                     'message':'something went wrong',
#                     'data':serializer.errors,

#                 })
            
#         except Exception as e:
#             # print("123s")
#             print(e)
#             return Response({'key': 'value'}, status=status.HTTP_200_OK)
        
class VerifyOTP(APIView):

    def post(self, request):
        try:
            data=request.data
            serializer=VerifyAccountSerializer(data=data)

            if serializer.is_valid():
                email=serializer.data['email']
                otp=serializer.data['otp']
                user=User.objects.filter(email=email)

                if not user.exists():
                    return Response({
                    'status':400,
                    'message':'something went wrong',
                    'data':'invalid mail',

                })
                if user[0].otp!=otp:
                    return Response({
                    'status':400,
                    'message':'something went wrong',
                    'data':'wrong otp',

                })
            
                user=user.first()
                user.is_verified=True
                user.save()
                return Response({
                'status':200,
                'message':'Account verified',
                'data':{},

                })
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({'key': 'value'}, status=status.HTTP_200_OK)
        
class ChangePassword(APIView):
   
    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)
        print("!23")
        if serializer.is_valid():
            print("8977")
            user=User.objects.filter(email=serializer.validated_data['gmail'])
            if user:
                serializer.save()
                print("account exists")
                send_otp_via_email(serializer.data['gmail'])


                # self.object.set_password(serializer.data.get("new_password"))
                # self.object.save()
                return Response({
                    'status':200,
                    'message':'email sent',
                    'data':serializer.data,
                })
            
            #user with that mail does not exist
            return Response({
                    'status':400,
                    'message':'something went wrong',
                    'data':'Account with this mail does not exist',

                })
            
        return Response({
                    'status':400,
                    'message':'something went wrong',
                    'data':serializer.errors,

                })


           
        # # self.object.set_password(serializer.data.get("new_password"))
        # # self.object.save()
        # return Response(status=status.HTTP_204_NO_CONTENT)

        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)           
