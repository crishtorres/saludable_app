from django.contrib import admin
from django.urls import path, include
from .views import register_view, create_user
# from django.views.generic.base import TemplateView
 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    # path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('', include('apps.patients.urls')),
    path('register/', register_view, name='register'),
    path('create_user/', create_user, name='create_user')
]