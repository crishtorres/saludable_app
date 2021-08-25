from django.urls import path

from .views import dashboard, register_new_food

app_name = 'Patients'

urlpatterns = [
    path('', dashboard, name='dashboard'),
    path('register_food/', register_new_food, name='register_food')
] 