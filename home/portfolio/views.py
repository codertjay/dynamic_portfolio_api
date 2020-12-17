from django.shortcuts import render
from .models import ProjectUrl, ProjectUrlItems
from rest_framework.views import APIView
from .serializers import ProjectSerializer, ProjectUrlSerializer


class ProjectUrlApiView(APIView):

    def get(self,request,*args,**kwargs):
        return Response(status=200)

    def post(self, request,*args,**kwargs):
        print('the data',self.request.data)
        serializer = ProjectUrlSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            print(serializer.data)
            """ in here we are sending what we submitted in our form data in json 
            format response to our javascript with status 201  """
            return Response(serializer.data, status=201)
        return Response({}, status=400)


def project_url__create_view(request, *args, **kwargs):
    data = request.data()
    user = 'user'
    name = 'name'
    image = image
    detail = detail
    url = url
    project_url, created = ProjectUrl.objects.get_or_create(
        user=user, name=name)
    project_url_item = ProjectUrlItems.objects.create(user=user,
                                                      image=image,
                                                      detail=detail,
                                                      url=url)
    project_url_qs = ProjectUrl.objects.filter(user=user, name=name)
    if project_url_qs.exists():
        project = project_url_qs[0]
        project_url.project_url_item.add(project_url_item)
        return None


