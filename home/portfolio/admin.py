from django.contrib import admin

from .models import ProjectItems,ProjectUrlItems,ProjectUrl,Project


admin.site.register(Project)
admin.site.register(ProjectItems)
admin.site.register(ProjectUrl)
admin.site.register(ProjectUrlItems)