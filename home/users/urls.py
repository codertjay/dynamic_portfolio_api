from django.urls import path
from rest_framework.routers import DefaultRouter

# from .views import UserViewSets
from .views import UserViewSets,ContactUserAPIView,ContactAdminAPIView

router = DefaultRouter()
router.register(r'', UserViewSets, basename='users')

urlpatterns = router.urls
urlpatterns +=[
    path('contactuser/',ContactUserAPIView.as_view()),
    path('contactadmin/',ContactAdminAPIView.as_view())
]
