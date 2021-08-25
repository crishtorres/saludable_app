from django.db.models.base import Model
from django import forms
from .models import DailyFood


class DailyFoodForm(forms.ModelForm):
    class Meta:
        model = DailyFood
        fields = ['date', 'kind_of_food', 'primary_food', 'secondary_food',
                  'drink', 'afters', 'afters_name', 'tentation', 'tentation_name', 'was_hungry']

        labels = {
            'date': 'Fecha:',
            'kind_of_food': 'Tipo de comida:',
            'primary_food': 'Comida principal:',
            'secondary_food': 'Comida secundaria:',
            'drink': 'Bebida:',
            'afters': '¿Ingirió postre?',
            'afters_name': '¿Qué postre?',
            'tentation': '¿Tuvo tentación de ingerir otro alimento?',
            'tentation_name': '¿Qué alimento?',
            'was_hungry': '¿Se quedó con hambre?'
        }

        widgets = {
            'date': forms.DateTimeInput(),
            'kind_of_food': forms.Select(attrs = {'class': 'form-control', 'required': 'required'}),
            'primary_food': forms.TextInput(attrs = {'class': 'form-control', 'required': 'required'}),
            'secondary_food': forms.TextInput(attrs = {'class': 'form-control'}),
            'drink': forms.TextInput(attrs = {'class': 'form-control'}),
            'afters': forms.Select(attrs = {'class': 'form-control', 'disabled': 'disabled'}),
            'afters_name': forms.TextInput(attrs = {'class': 'form-control', 'disabled': 'disabled'}),
            'tentation': forms.Select(attrs = {'class': 'form-control'}),
            'tentation_name': forms.TextInput(attrs = {'class': 'form-control', 'disabled': 'disabled'}),
            'was_hungry': forms.Select(attrs = {'class': 'form-control'}),
        }