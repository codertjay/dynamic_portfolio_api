from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView,ListAPIView,RetrieveAPIView
from rest_framework.status import HTTP_201_CREATED,HTTP_400_BAD_REQUEST
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# my file
from portfolio.models import Project
from portfolio.Project.serializers import ProjectSerializer,ProjectItemsSerializer



class UserProjectListApiView(ListAPIView):
    serializer_class = ProjectSerializer()

    def get_queryset(self,*args,**kwargs):
        project = Project.objects.filter(user,self.request.user)
        return project


class UserProjectItemListApiView(ListAPIView):
    serializer_class = ProjectItemsSerializer()

    def get_queryset(self,*args,**kwargs):
        projectItem = Project.project_item.objects(user,self.request.user)
        return projectItem





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def project_create_view(request, *args, **kwargs):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data()
        name = data.get('name')
        Project.objects.create(user=self.request.user,name=name)
        return Response(status=HTTP_201_CREATED)
    else:
        return Response(status=HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def project_create_view(request, *args, **kwargs):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data()
        name = data.get('name')
        Project.objects.create(user=self.request.user,name=name)
        return Response(status=HTTP_201_CREATED)
    else:
        return Response(status=HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def project_item_create_view(request, *args, **kwargs):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data()
        image = data.get('image')
        detail = data.get('detail')
        project = Project.project_item.objects.create(user=self.request.user,
                                                      image=image,
                                                      detail=detail)
        return Response(status=HTTP_201_CREATED)
    else:
        return Response(status=HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def project_item_delete_view(request, *args, **kwargs):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data()
        id = data.get('id')
        project_qs = Project.project_item.objects.filter(id=id)
        if project_qs.exists():
            project = project_qs.first()
            if project.user == self.request.user():
                project.delete()
            return Response({'messsage': 'Item was deleted'}, status=200)
    else:
        return Response(status=HTTP_400_BAD_REQUEST)



