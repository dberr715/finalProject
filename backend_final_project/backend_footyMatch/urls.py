from django.contrib import admin
from django.urls import path, include
from footyMatchApp import views
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from . import views

router = routers.DefaultRouter()
router.register(r"user", views.UserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("token/", views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("register/", views.UserCreateView.as_view(), name="user_register"),
]
