from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import make_password
from .serializers import SignUpSerializer, UserSerializer

from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User

# Create your views here.


@api_view(['POST'])
def signup(req):
    data = req.data
    print(data)
    user = SignUpSerializer(data=data)

    if user.is_valid():
        if not User.objects.filter(username=data['email']).exists():
            user = User.objects.create(
                username=data['email'],
                email=data['email'],
                password=make_password(data['password']),
            )
            return Response(
                {
                    'message': 'User registered',
                },
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    'error': 'User already exists',
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    else:
        return Response(user.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    user = UserSerializer(request.user)

    return Response(user.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user = request.user

    data = request.data

    user.username = data['email']
    user.email = data['email']

    # eğer şifre de değiştirmek isterse--boş bırakılırsa şifre değişmez
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)
