from django.test import TestCase
from django.contrib.auth.models import User

import datetime

from apps.patients.models import DailyFood, Patients


class ModelsTestCase(TestCase):

    def setUp(self):

        # Creo un usuario
        User.objects.create(username='demo', password='demo')

        # Obtengo ese usuario
        user = User.objects.get(pk=1)

        date = datetime.datetime(1991, 8, 15)
        Patients.objects.create(dni=123456, gender='M', date_of_birth=date, location='Buenos Aires',
                                treatment='B', user=user)

        # Creo una entrada de comida diaria
        DailyFood.objects.create(date='2021-07-20', kind_of_food='D',
                                 primary_food='Comida primaria', secondary_food='Comida secundaria',
                                 drink='Agua', afters='N', afters_name='', tentation='S', tentation_name='Otra comida',
                                 was_hungry='S', user=user)

    def test_get_name_of_type(self):
        # Verifico la funcion que retorna el nombre de la comida
        food = DailyFood.objects.get(date='2021-07-20')
        self.assertEqual(food.get_name_of_type(), 'Desayuno')

    def test_get_format_date(self):
        food = DailyFood.objects.get(date='2021-07-20')
        self.assertEqual(food.get_format_date(), '20/07/2021')

