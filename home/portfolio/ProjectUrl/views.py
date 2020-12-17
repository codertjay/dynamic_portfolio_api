from rest_framework.mixins import RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView

from portfolio.models import ProjectUrl, ProjectUrlItems
from portfolio.ProjectUrl.serializers import (ProjectUrlSerializer,
                                              ProjectDetailUrlSerializer,
                                              ProjectUrlItemsSerializer)
from ..models import Project
from rest_framework.generics import (CreateAPIView,
                                     RetrieveUpdateAPIView,
                                     ListAPIView, RetrieveAPIView,
                                     RetrieveDestroyAPIView, DestroyAPIView)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly)
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from users.models import User
# my permissions
from .permissions import IsOwnerOrReadonly
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK


class ProjectUrlTestingListApiView(ListAPIView):
    serializer_class = ProjectDetailUrlSerializer
    permission_classes = [AllowAny]

    def get_queryset(self, *args, **kwargs):
        """ the reason why i comment this is because if there is a
        queryset then we in the class then we are going to use it
        but there is none so i am passing hte queryset in here """
        # query_list = super(PostListApiView,self).get_queryset(*args)
        projectUrl = ProjectUrl.objects.all()
        username = self.request.GET.get('username')
        query = User.objects.filter(username=username).first()
        if query:
            query_list = projectUrl.filter(user=query)
            print('query_list', query_list)
        else:
            query_list = projectUrl.none()
        return query_list


class ProjectUrlListAPIView(ListAPIView):
    serializer_class = ProjectUrlSerializer
    model = ProjectUrl
    permission_classes = [AllowAny]
    queryset = ProjectUrl.objects.all()


def projectUrlAPIAnonymousAPIView(self, *args, **kwargs):
    """ the reason why i comment this is because if there is a
    queryset then we in the class then we are going to use it
    but there is none so i am passing hte queryset in here """
    print('the request ', self.request.data.get('username'))
    username = self.request.POST.get('username')
    user_qs = User.objects.filter(username=username)
    if user_qs.exists():
        user = user_qs.first()
        print('user', user)
        if user:
            query_list = ProjectUrl.objects.filter(user=user)
            print('query list', query_list)
            serialized_data = ProjectDetailUrlSerializer(
                many=True, data=query_list)
            serialized_data.is_valid(raise_exception=True)
            print('serialized_data errors', serialized_data.errors)
            serializer = serialized_data.data
            print('the serializer', serializer)
            return serializer
    return None


class ProjectUrlCreateApIView(CreateAPIView):
    serializer_class = ProjectUrlSerializer
    model = ProjectUrl
    permission_classes = [IsAuthenticated]


class ProjectUrlDeleteApIView(DestroyAPIView):
    serializer_class = ProjectUrlSerializer
    model = ProjectUrl


class ProjectUrlUpdateAPIView(RetrieveUpdateAPIView):
    serializer_class = ProjectUrlSerializer
    model = ProjectUrl
    permission_classes = [IsOwnerOrReadonly]

    def perform_create(self, serializer):
        """ this is to add the user that is creating the post
         to the post """
        serializer.save(user=self.request.user)

    def perform_destroy(self, serializer):
        serializer.delete(user=self.request.user)


class ProjectUrlItemsCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        projectUrlId = self.request.data.get('projectUrlId')
        image = self.request.data.get('image')
        detail = self.request.data.get('detail')
        projectUrl = ProjectUrl.objects.filter(user=self.request.user,
                                               id=projectUrlId).first()
        if projectUrl:
            project_Url_items = projectUrl.projecturl_items.objects.create(user=self.request.user,
                                                                           image=image,
                                                                           detail=detail)
            serialized_data = ProjectDetailUrlSerializer(
                data=project_Url_items)
            if serialized_data.is_valid():
                serializer = serialized_data.data
                return serializer
        return Response(status=HTTP_400_BAD_REQUEST)


class ProjectUrlItemsDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, *args, **kwargs):
        projectUrlId = self.request.data.get('projectUrlId')
        projectUrlId_item_id = self.request.data.get('projectUrl_item_id')
        projectUrl = ProjectUrl.objects.filter(user=self.request.user,
                                               id=projectUrlId).first()
        if projectUrl:
            project_Url_items = projectUrl.projecturl_items.objects.filter(id=projectUrlId_item_id,
                                                                           user=self.request.user)
            if project_Url_items.exists():
                item = project_Url_items.first()
                item.delete()
                data = {
                    'item': 'item deleted'
                }
                return Response(status=HTTP_200_OK, data=data)

        return Response(status=HTTP_400_BAD_REQUEST)


class ProjectItemsApiView(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProjectDetailUrlSerializer

    def get_queryset(self, *args, **kwargs):
        project_items = ProjectUrlItems.objects.all()
        username = self.request.GET.get('username')
        query = User.objects.filter(username=username).first()
        if query:
            query_list = ProjectUrlItems.filter(user=query)
            print('query_list', query_list)
        else:
            query_list = ProjectUrlItems.none()
        return query_list
