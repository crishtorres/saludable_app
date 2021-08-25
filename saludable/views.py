
from django.shortcuts import render
from django.http import JsonResponse

from django.contrib.auth.models import User

from apps.patients.models import Patients


def register_view(request):
    return render(request, 'registration/register.html')

def create_user(request):
    if request.method == 'POST':

        # Verificar que el usuario no exista, si existe, devolver error
        username = request.POST.get('user')
        
        if username:
            if User.objects.filter(username=username).exists():
                return JsonResponse([{'status': 'error', 'message': f'Ya existe el usuario {username}'}], safe=False)
        else:
            return JsonResponse([{'status': 'error', 'message': 'Debe informar el usuario'}], safe=False)

        # Crear usuario, si crea, crear datos extras de usuario
        password = request.POST.get('password')
        name = request.POST.get('name', '')
        surname = request.POST.get('surname', '')

        try:
            user = User.objects.create_user(
                username=username, password=password)
            user.first_name = name
            user.last_name = surname
            user.save()

            patient = Patients()
            patient.dni = request.POST.get('dni')
            patient.gender = request.POST.get('gender')
            patient.date_of_birth = request.POST.get('date_of_birth')
            patient.location = request.POST.get('location')
            patient.treatment = request.POST.get('treatment')
            patient.user = user
            patient.save()

            return JsonResponse([{'status': 'ok', 'message': 'usuario creado con exito'}], safe=False)
        except:
            User.objects.filter(username=username).delete()
            return JsonResponse([{'status': 'error', 'message': 'Ocurrió un error al crear el usuario'}], safe=False)
