from django.contrib import admin
from django.urls import path, include
from footyMatchApp import views
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from footyMatchApp.views import MyTokenObtainPairView
from footyMatchApp.views import FavoriteTeamDelete

router = routers.DefaultRouter()
router.register(r"user", views.UserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("register/", views.UserCreateView.as_view(), name="user_register"),
    path("favorite-teams/", views.FavoriteTeam.as_view(), name="favorite-teams"),
    path('favorite-teams/<str:team_name>/', FavoriteTeamDelete.as_view(), name='favorite-team-delete'),

]
