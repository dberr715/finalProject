from .models import FMUser
from rest_framework import viewsets, status
from .serializers import (
    UserSerializer,
)
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from django.shortcuts import redirect
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings

from .serializers import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




class FavoriteTeamsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        favorites = request.data.get("favorites", [])
        fm_user, _ = FMUser.objects.get_or_create(user=user)
        fm_user.favorites = favorites
        fm_user.save()
        return Response(
            {"message": "Favorite teams updated successfully."},
            status=status.HTTP_200_OK,
        )


class UserViewSet(viewsets.ModelViewSet):
    queryset = FMUser.objects.all()
    serializer_class = UserSerializer


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserCreateView(APIView):
    def post(self, request):
        print(request)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            newUser = serializer.save()
            newUser.password = make_password(request.data["password"])
            newUser.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
