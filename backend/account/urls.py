from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('user/', views.getUser, name='get_user'),
    path('user/update/', views.updateUser, name='update_user'),
]
