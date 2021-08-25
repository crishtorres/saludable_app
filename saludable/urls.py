from django.contrib import admin
from django.urls import path, include
from .views import register_view, create_user

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', include('apps.patients.urls')),
    path('register/', register_view, name='register'),
    path('create_user/', create_user, name='create_user')
]