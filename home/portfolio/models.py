from django.db import models
from users.models import User


class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.user.username} - {self.name}-created items- {self.project_items.count()}'


class ProjectItems(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField()
    detail = models.CharField(max_length=500)
    project = models.ForeignKey(Project,
                                on_delete=models.CASCADE,
                                related_name='project_items',
                                blank=True, null=True)
    view_count = models.IntegerField()                           

    def __str__(self):
        return f'{self.user.username} - {self.project.name}'






appbar_color = (
    ('primaryColor', 'primaryColor'),
    ('warningColor', 'warningColor'),
    ('dangerColor', 'dangerColor'),
    ('successColor', 'successColor'),
    ('infoColor', 'infoColor'),
    ('roseColor', 'roseColor'),
    ('grayColor', 'grayColor')
)




class ProjectUrl(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    appbar_color = models.CharField(choices=appbar_color, max_length=50, default='primaryColor')

    def __str__(self):
        return f'{self.user.username} - {self.name}-created items- {self.projecturl_items.count()}'


class ProjectUrlItems(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    image = models.ImageField()
    detail = models.CharField(max_length=500)
    project_url = models.ForeignKey(ProjectUrl,
                                    on_delete=models.CASCADE,
                                    related_name='projecturl_items',
                                    blank=True, null=True)
    view_count = models.IntegerField()                               

    def __str__(self):
        return f'{self.user.username} - {self.project_url.name}'



