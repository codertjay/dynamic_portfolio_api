from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView, ListAPIView

from .serializers import ProfileSerializer, TestimonialSerializer
from .models import Profile, Testimonial
from rest_framework.response import Response
from users.models import User
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly)


class ProfileViewSets(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    # in this retrieve i would retrieve base on the username

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        print('instance', instance.user.username)
        print(instance.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class Testimonials(ListAPIView):
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    model = Testimonial

    def get_queryset(self, *args, **kwargs):
        project_items = Testimonials.objects.all()
        username = self.request.GET.get('username')
        query = User.objects.filter(username=username).first()
        if query:
            query_list = Testimonials.filter(user=query)
            print('query_list', query_list)
        else:
            query_list = Testimonials.none()
        return query_list
