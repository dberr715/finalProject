from .models import User
from rest_framework import viewsets, status
from .serializers import (
    UserSerializer,
    UrlDataSerializer,
    
)
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import redirect


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-username")
    serializer_class = UserSerializer

class LogoutView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)