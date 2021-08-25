from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models import Count

import json
from datetime import datetime
import requests

from .models import DailyFood
from .forms import DailyFoodForm


@login_required
def dashboard(request):
    date_foods = DailyFood.objects.values('date').annotate(total=Count('date')).filter(user=request.user).order_by('-date')

    final_result = []
    result = []

    for date in date_foods:
        foods = DailyFood.objects.filter(user=request.user).filter(date=date['date'])
        
        for food in foods:
            result.append({
                'name': food.get_name_of_type(),
                'primary_food': food.primary_food,
                'secondary_food': food.secondary_food,
                'drink': food.drink,
                'afters': food.afters,
                'afters_name': food.afters_name,
                'tentation': food.tentation,
                'tentation_name': food.tentation_name,
                'was_hungry': food.was_hungry,
            })
        
        final_result.append({
            'date': date['date'].strftime('%d/%m/%Y'),
            'foods': result
        })

        result = []

    context = {
        'foods': final_result
    }

    return render(request, 'patients/dashboard.html', context=context)


@login_required
def register_new_food(request):

    if request.method == 'POST':
        received_data = json.loads(request.body)
        edit = True if request.headers['is-edit'] == 'true' else False
        first = True

        for info in received_data:
            
            date_register = datetime.strptime(info['date_register'], '%Y-%m-%d')

            if edit and first:
                try:
                    DailyFood.objects.filter(user=request.user).filter(date=date_register).delete()
                    first = False
                except:
                    return JsonResponse([{'status': 'error'}], safe=False)

            if not edit:
                exists = DailyFood.objects.filter(user=request.user).filter(
                    date=date_register).filter(kind_of_food=info['type'])

                if(exists):
                    return JsonResponse([{'status': 'error', 'message': f'Ya existe la entrada para {info["name"]} del día {info["date_register"]}'}], safe=False)

            daily_food = DailyFood()
            daily_food.kind_of_food = info['type']
            daily_food.primary_food = info['primary_food']
            daily_food.secondary_food = info['secondary_food']
            daily_food.drink = info['drink']
            daily_food.afters = info['afters']
            daily_food.afters_name = info['afters_name']
            daily_food.tentation = info['tentation']
            daily_food.tentation_name = info['tentation_name']
            daily_food.was_hungry = info['was_hungry']
            daily_food.date = date_register
            daily_food.user = request.user

            try:
                daily_food.save()
            except:
                return JsonResponse([{'status': 'error'}], safe=False)

        # Retorno el trago
        response = requests.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        if response.status_code == 200:
            drink_api_response = response.json()
        else:
            drink_api_response = ""

        return JsonResponse([{'status': 'ok', 'drink_api': drink_api_response}], safe=False)

    elif request.method == 'GET':

        date_edit = request.GET.get('date','')
        foods = None
        date = None

        if date_edit:
            date = datetime.strptime(date_edit, '%d-%m-%Y')
            foods = DailyFood.objects.filter(user=request.user).filter(date=date)
            date = datetime.strftime(date, "%Y-%m-%d")

        form = DailyFoodForm()
        return render(request, 'patients/register_new_food.html', {'form': form, 'foods': foods, 'date_edit': date})
