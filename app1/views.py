from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .emails import *
from django.urls import reverse
from django.contrib.auth import authenticate
from django.contrib.auth import login, logout
from django.utils.crypto import get_random_string
from passlib.hash import django_pbkdf2_sha256
from django.core.serializers import serialize
from django.http import JsonResponse
from django.db.models import Q
from datetime import timedelta

# from django.views.decorators.csrf import ensure_csrf_cookie

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

    def post(self, request, email):
      
        data=request.data
        serializer=VerifyOTPSerializer(data=data)
       
        if serializer.is_valid():
            
            otp=serializer.data['otp']
            new_p = serializer.data['new_password']
            # serializer.data['mail']=email
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
            user.set_password(new_p)
            print(new_p)
            # print("Earlier pwd", user.password)
            user.password=new_p
            # print("New pwd", user.password)
            user.is_verified=True
            user.save()
            
            return Response({
            'status':200,
            'message':'Account verified',
            'data':{},

            })


        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        # except Exception as e:
        #     return Response({'key': 'value'}, status=status.HTTP_200_OK)
        
class VerifyEmail(APIView):
   
    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = EmailVerificationSerializer(data=request.data)
        print("!23")
        if serializer.is_valid():
            print("8977")
            user=User.objects.filter(email=serializer.validated_data['mail'])
            if user:
                send_otp_via_email(serializer.data['mail'])
                
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

# class ResetPassword(APIView):
#     def post(self, )
    
class SignIn(APIView):
   
    def get_object(self, queryset=None):
        return self.request.user
    
    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        if request.user.id != None:
            return Response({
                    'status':400,
                    'message':'something went wrong',
                    'data':'An User already logged in',
                })
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            user=User.objects.get(email=serializer.validated_data['email'])
            print(user)
            print(user.password)
            if user and authenticate(request, username=None, email=serializer.validated_data['email'], password=serializer.validated_data['password']):
                login(request, user)
                return Response({
                    'status':200,
                    'message':'User logged in',
                    'data':serializer.data
                })

            #user with that mail does not exist
            return Response({
                    'status':400,
                    'message':'something went wrong',
                    'data':'Wrong password',
                })
            
        return Response({
                    'status':400,
                    'message':'something went wrong',
                    'data':serializer.errors,

                })
    
class SignOut(APIView):
   
    def get_object(self, queryset=None):
        return self.request.user

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        try:
            usr = request.user
            logout(request)
            return Response({
                'status':200,
                'message':'User logged out',
                'data':usr.email,
            })
        except:
            return Response({
                    'status':400,
                    'message':'something went wrong',

                })
    
# @ensure_csrf_cookie
class AdminMonitor(APIView):
   
    def get_object(self, queryset=None):
        return self.request.user
    
    def delete(self, request, *args, **kwargs):
        self.object = self.get_object()
        user = request.user
        serializer = EmailVerificationSerializer(data=request.data)
        if serializer.is_valid():
            if user.is_admin == True:
                if not User.objects.filter(email=serializer.validated_data['mail']).exists():
                    return Response({
                    'status':200,
                    'message':'User not found',
                })
                usr=User.objects.get(email=serializer.validated_data['mail'])
                e = usr.email
                usr.delete()
                return Response({
                    'status':200,
                    'message':'User deleted',
                    'user':e,
                })
            return Response({
                'status':400,
                'message':'Permission denied',
            })
        return Response({
                    'status':400,
                    'message':'something went wrong',
                    'data':serializer.errors,

                })
    
    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        user = request.user
        serializer = AdminAddSerializer(data=request.data)
        if serializer.is_valid():
            if user.is_admin == True:
                temp_pass = get_random_string(length=10, allowed_chars="abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789")
                usr=User.objects.create(email=serializer.validated_data['mail'], password=django_pbkdf2_sha256.hash(temp_pass), role=serializer.validated_data['role'], club_name=serializer.validated_data['club_name'])
                e = usr.email
                send_random_password(serializer.validated_data['mail'], temp_pass)
                return Response({
                    'status':200,
                    'message':'User created',
                    'user':e,
                })
            return Response({
                'status':400,
                'message':'Permission denied',
            })
        return Response({
                    'status':400,
                    'message':'something went wrong',
                    'data':serializer.errors,

                })
    
class ResourceDetail(APIView):
   
    def get_object(self, queryset=None):
        return self.request.user

    #Deatils of the booked session of a resource for 6 days after a particular date.
    def put(self, request, resource, *args, **kwargs):
        # self.object = self.get_object()

        serializer=Getdate(data=request.data)
        #returns booking of that particular resource for the next 7 days
        if request.user.is_authenticated:
            if serializer.is_valid():
                # start_date=serializer.validated_data['date']
                # end_date=start_date + timedelta(days = 7)
                # print(start_date)
                # print(end_date)
                # # curr_date=start_date

                curr_date = serializer.validated_data['date']
                
                # bookings_list = []
                serialized_bookings = []
        
                for i in range (0,6):
                    bookings=Booking.objects.filter(
                        resource=resource,
                        date=curr_date                    
                    )
                    for booking in bookings:
                        serialized_booking = {
                            'start_time': booking.start_time,
                            'end_time': booking.end_time,
                        }
                        serialized_bookings.append(serialized_booking)
                    
                    
                    curr_date = curr_date + timedelta(days = 1)

                
                # for booking in bookings:
                #     serialized_booking = {
                #         'start_time': booking.start_time,
                #         'end_time': booking.end_time,
                #     }
                #     serialized_bookings.append(serialized_booking)

                return JsonResponse({
                    'status': 200,
                    'message': 'Showing details',
                    # 'booking_allowed': e,
                    'bookings': serialized_bookings
                })
            else:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'Something went wrong',
                    'errors': serializer.errors
                })
            
        else:
            return Response({
                'status': status.HTTP_400_BAD_REQUEST,
                'message': 'Permission denied'
            })
    
        
            
    #Booking of the resource.
    def post(self, request, resource, *args, **kwargs):
        user = request.user
        data = request.data.copy()
        data['user'] = user.id
        data['resource'] = resource
        serializer = BookingSerializer(data=data)
        
        if serializer.is_valid():
            if user.is_authenticated:
                
              
                booking = serializer.save()
                curr_start_time=data['start_time']
                curr_end_time=data['end_time']
                resource_head=resource.resource_head
                print(resource_head)

               
                

                

                return Response({
                    'status': status.HTTP_200_OK,
                    'message': 'Session Booked',
                    'booking_id': booking.booking_id
                })
            else:
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'message': 'Permission denied'
                })
        else:
            return Response({
                'status': status.HTTP_400_BAD_REQUEST,
                 'message': 'Something went wrong',
                'errors': serializer.errors
            })
        
class AcceptRequest(APIView):
    def patch(self,request,booking_id,*args,**kwargs):
        

        if request.user.is_authenticated and request.user.numericRoleLevel>=2:
            # user_instance=User.objects.get(pk=request.user.id)
            
            try:
                booking_instance = Booking.objects.get(pk=booking_id)
            except Booking.DoesNotExist:
                return Response({"message": "Booking does not exist."}, status=404)
           
            # to upate partially we pass instance as a paramter
            serializer=acceptrequestSerializer(booking_instance,data=request.data)
            if serializer.is_valid():
                accept_value = serializer.validated_data.get('accept')
                if accept_value:
                
                    booking_instance.list.append(True)
                    serializer.save()
                    print("hello")
                    cnt=0
                    required=3
                    # percent=0
                    for item in booking_instance.list:
                       if item==True:
                           cnt+=1
                    percent=int((cnt/required)*100)

                    if cnt==required:
                        return Response(
                            {'message':"booking done"
                            }
                        )
                    else :
                        return Response(
                            {'message':f"{percent}% done"
                            }
                        )
                else :
                    # booking_instance.list.append(False)
                    booking_instance.delete()
                    # serializer.save()


               
            return  Response(serializer.errors, status=400)
        
        else:
            return Response({"message": "User is not authenticated or does not have the required role."}, status=403)

