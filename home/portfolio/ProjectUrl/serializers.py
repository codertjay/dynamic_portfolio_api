from rest_framework import serializers
from portfolio.models import Project, ProjectUrl, ProjectUrlItems, ProjectItems
from users.serializers import UserSerializer


class StringSerializer(serializers.StringRelatedField):

    def to_internal_value(self, data):
        return value


class ProjectUrlItemsSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    user = StringSerializer()

    class Meta:
        model = ProjectUrlItems
        fields = ('user','id','name', 'detail', 'image',)


class ProjectUrlSerializer(serializers.ModelSerializer):
    project_url_items = serializers.SerializerMethodField()
    user = StringSerializer()

    class Meta:
        model = ProjectUrl
        fields = ('user',
                 'id',
                  'name',
                  'project_url_items',
                  )

    def get_project_url_items(self, obj):
        print(obj.projecturl_items.all())
        project_url_items = obj.projecturl_items.all()
        data = ProjectUrlItemsSerializer(project_url_items, many=True).data
        return data


# for the whole detail of the user project
class ProjectDetailUrlSerializer(serializers.ModelSerializer):
    project_url_items = serializers.SerializerMethodField()
    user = UserSerializer()

    class Meta:
        model = ProjectUrl
        fields = ['id', 'user','id', 'name', 'appbar_color','project_url_items']

    def get_project_url_items(self, obj):
        project_url_items = obj.projecturl_items.all()
        data = ProjectUrlItemsSerializer(project_url_items, many=True).data
        return data
