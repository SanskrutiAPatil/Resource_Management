from django.core.mail import send_mail
import random
from django.conf import settings
from .models import User



def send_otp_via_email(email):

    subject = 'Your account verification email'

    otp = random.randint(1000, 9999)

    message = f'Your otp is {otp}'

    email_from = settings.EMAIL_HOST

    send_mail(subject, message, email_from, [email])
    user_obj=User.objects.get(email=email)
    user_obj.otp=otp
    user_obj.save()

def send_random_password(email, password):
    subject = 'Your random password'

    message = f'Your pass is {password}'

    email_from = settings.EMAIL_HOST

    send_mail(subject, message, email_from, [email])

def send_email_to_resourcehead(email):
    subject='you have received a request '
    message='Respond at the earliest'
    email_from = settings.EMAIL_HOST
    send_mail(subject, message, email_from, [email])