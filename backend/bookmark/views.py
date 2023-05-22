from urllib import request
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from .serializers import BookmarkSerializer
from .models import Bookmark, User

from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404


@api_view(['GET'])
def getBookBookmarks(req):

    bookBookmarks = Bookmark.objects.filter(category='Book', user=req.user)

    serializer = BookmarkSerializer(bookBookmarks, many=True)

    return Response({
        'book': serializer.data
    })


@api_view(['GET'])
def getMovieBookmarks(req):

    movieBookmarks = Bookmark.objects.filter(category='Movie', user=req.user)

    serializer = BookmarkSerializer(movieBookmarks, many=True)

    return Response({
        'movie': serializer.data
    })


@api_view(['GET'])
def getMusicBookmarks(req):
    user = req.user

    musicBookmarks = Bookmark.objects.filter(category='Music', user=user)

    serializer = BookmarkSerializer(musicBookmarks, many=True)

    return Response({
        'music': serializer.data
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newBookmark(req):
    data = req.data
    user = User.objects.get(id=req.user.id)
    data['user'] = user

    newBookmark = Bookmark.objects.create(**data)
    serializer = BookmarkSerializer(newBookmark, many=False)
    return Response({'message': 'Bookmark successfully added', 'data': serializer.data})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBookmark(req, pk):
    bookmark = get_object_or_404(Bookmark, id=pk)

    if bookmark.user != req.user:
        return Response({'message': 'You can not delete this bookmark'}, status=status.HTTP_403_FORBIDDEN)

    bookmark.delete()

    return Response({'message': 'Bookmark is deleted'}, status=status.HTTP_200_OK)
