from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),

    # users
    path('users/', include('users.urls')),
    # i would pass the username and filter through it to get the users
    path('profile/', include('_profile.urls')),

    # portfolio

    path('project/', include('portfolio.Project.urls')),
    path('projecturl/', include('portfolio.ProjectUrl.urls')),

    path('blog_api/', include('blog.api.urls')),
    path('comments_api/', include('comments.api.urls')),

    # re_path(r'^.*', TemplateView.as_view(template_name='index.html'))

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
