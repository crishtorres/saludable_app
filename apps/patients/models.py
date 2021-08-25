from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

YES_NO_CHOICES = [
    ('S', 'SI'),
    ('N', 'NO')
]


class Patients(models.Model):

    GENDERS = [
        ('M', 'Masculino'),
        ('F', 'Femenino')
    ]

    TREATMENTS = [
        ('A', 'Anorexia'),
        ('B', 'Bulimia'),
        ('O', 'Obesidad')
    ]

    dni = models.IntegerField()
    gender = models.CharField(max_length=1, choices=GENDERS)
    date_of_birth = models.DateTimeField()
    location = models.CharField(max_length=100, null=True, blank=True)
    treatment = models.CharField(max_length=1, choices=TREATMENTS)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} {self.surname}"


class DailyFood(models.Model):

    FOODS = [
        ('D', 'Desayuno'),
        ('A', 'Almuerzo'),
        ('M', 'Merienda'),
        ('C', 'Cena')
    ]

    date = models.DateField(blank=True,null=True)
    kind_of_food = models.CharField(max_length=1, choices=FOODS, default='D')
    primary_food = models.CharField(max_length=150, null=True, blank=True)
    secondary_food = models.CharField(max_length=150, null=True, blank=True)
    drink = models.CharField(max_length=100, null=True, blank=True)
    afters = models.CharField(
        max_length=1, choices=YES_NO_CHOICES, default='N')
    afters_name = models.CharField(max_length=150, null=True, blank=True)
    tentation = models.CharField(
        max_length=1, choices=YES_NO_CHOICES, default='N')
    tentation_name = models.CharField(max_length=150, null=True, blank=True)
    was_hungry = models.CharField(max_length=1, choices=YES_NO_CHOICES, default='N')
    created_at = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.kind_of_food} - {self.date}"

    def get_name_of_type(self):
        for item in self.FOODS:
            if item[0] == self.kind_of_food:
                return item[1]
    
    def get_was_hungry(self):
        return 'SI' if self.was_hungry == 'S' else 'NO'
    
    def get_format_date(self):
        return self.date.strftime("%d/%m/%Y")
    
    def get_js_format_date(self):
        return self.date.strftime("%Y-%m-%d")

