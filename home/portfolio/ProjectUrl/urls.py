from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (projectUrlAPIAnonymousAPIView,
                    ProjectUrlListAPIView,
                    ProjectUrlCreateApIView,
                    ProjectUrlDeleteApIView,
                    ProjectUrlUpdateAPIView,
                    ProjectUrlItemsCreateAPIView,
                    ProjectUrlItemsDeleteAPIView,
                    ProjectUrlTestingListApiView,
                    ProjectItemsApiView
                    )

urlpatterns = [
    # for all users
    path('projecturl_list/', ProjectUrlListAPIView.as_view()),

    # to view user portfoilio
    path('projecturl_anonymous/', ProjectUrlTestingListApiView.as_view()),

    # to view the whole items in all the projects
    path('projecturl_items/', ProjectItemsApiView.as_view()),


    path('projecturl_create/', ProjectUrlCreateApIView.as_view()),
    path('<int:pk>/projecturl_delete/', ProjectUrlDeleteApIView.as_view()),
    path('<int:pk>/projecturl_update/', ProjectUrlUpdateAPIView.as_view()),

    path('projecturl_item_create/', ProjectUrlItemsCreateAPIView.as_view()),
    path('<int:pk>/projecturl_item_delete/',
         ProjectUrlItemsDeleteAPIView.as_view()),

]
