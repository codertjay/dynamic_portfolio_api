from rest_framework import serializers
from portfolio.models import Project, ProjectUrl, ProjectUrlItems, ProjectItems


class ProjectItemsSerializer(serializers.Serializer):
    class Meta:
        model = ProjectItems
        fields = ('__all__')


class ProjectSerializer(serializers.ModelSerializer):
    project_item = ProjectItemsSerializer(many=True, read_only=False)

    class Meta:
        model = Project
        fields = ('__all__')


