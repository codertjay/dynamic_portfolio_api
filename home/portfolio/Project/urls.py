from rest_framework.routers import DefaultRouter
from django.urls import path
# from .views import UserViewSets
from .views import project_item_create_view


urlpatterns = [
    path('create_project/',project_item_create_view),

]
