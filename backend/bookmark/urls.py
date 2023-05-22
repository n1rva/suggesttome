from django.urls import path
from . import views

urlpatterns = [
    path('bookmark/books/', views.getBookBookmarks, name='book_bookmarks'),
    path('bookmark/movies/', views.getMovieBookmarks, name='movie_bookmarks'),
    path('bookmark/musics/', views.getMusicBookmarks, name='music_bookmarks'),
    path('bookmark/new/', views.newBookmark, name='new_bookmark'),
    path('bookmark/<str:pk>/delete/',
         views.deleteBookmark, name='delete_bookmark'),
]
