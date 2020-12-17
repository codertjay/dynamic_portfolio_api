from django.template.loader import get_template
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from .models import User, ContactUser,ContactAdmin
from .serializers import UserSerializer
from django.core.mail import send_mail


class UserViewSets(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'username'




class ContactUserAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, *args, **kwargs):
        contact_name = self.request.data.get('name')
        contact_email = self.request.data.get('from_email')
        contact_subject = self.request.data.get('subject')
        contact_message = self.request.data.get('message')
        to_email = self.request.data.get('to_email')
        template = get_template('../build/contact.txt')
        contact = ContactUser(contact_name=contact_name,
                              contact_email=contact_email,
                              contact_subject=contact_subject,
                              contact_message=contact_message,
                              to_email=to_email)
        context = {
            'contact_name': self.request.data.get('name'),
            'contact_email': self.request.data.get('from_email'),
            'contact_subject': self.request.data.get('subject'),
            'contact_message': self.request.data.get('message'),
            'to_email': self.request.data.get('to_email')
        }
        content = template.render(context)
        if context:
            send_mail(
                context.contact_name,
                context.contact_message,
                context.contact_email,
                [context.to_email],
                fail_silently=False,
            )
            return Response(status=HTTP_200_OK)
        return Response(status=HTTP_400_BAD_REQUEST)

class ContactAdminAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, *args, **kwargs):
        contact_name = self.request.data.get('name')
        contact_email = self.request.data.get('from_email')
        contact_subject = self.request.data.get('subject')
        contact_message = self.request.data.get('message')
        template = get_template('../build/contact.txt')
        contact = ContactAdmin(contact_name=contact_name,
                              contact_email=contact_email,
                              contact_subject=contact_subject,
                              contact_message=contact_message,
                              )
        context = {
            'contact_name': self.request.data.get('name'),
            'contact_email': self.request.data.get('from_email'),
            'contact_subject': self.request.data.get('subject'),
            'contact_message': self.request.data.get('message'),
            'to_email': self.request.data.get('to_email')
        }
        content = template.render(context)
        if context:
            send_mail(
                context.contact_name,
                context.contact_message,
                context.contact_email,
                [context.to_email],
                fail_silently=False,
            )
            return Response(status=HTTP_200_OK)
        return Response(status=HTTP_400_BAD_REQUEST)



