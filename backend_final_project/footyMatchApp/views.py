from .models import Favorites
from rest_framework import viewsets, status, generics
from .serializers import (
    UserSerializer,
    FavoritesSerializer,
    MyTokenObtainPairSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .models import Favorites
from .serializers import FavoritesSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class FavoriteTeamDelete(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer


class FavoriteTeam(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            serializer = FavoritesSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user = request.user

        favorite_teams = Favorites.objects.filter(user=user)

        favorite_teams_data = FavoritesSerializer(favorite_teams, many=True).data

        return Response(favorite_teams_data, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
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
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            newUser = serializer.save()
            newUser.password = make_password(request.data["password"])
            newUser.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
