from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse

from ..views import register_new_food

class ViewsTestCase(TestCase):
    def setUp(self):
        # Creo un usuario
        User.objects.create(username='demo', password='demo')

    def test_load_dashboard(self):
        response = self.client.get('localhost:8000/patients/dashboard/')
        self.assertEqual(response.status_code, 404)

    def test_register_new_food(self):
        response = self.client.get('localhost:8000/register_new_food/')
        self.assertEqual(response.status_code, 404)

    def test_login_page(self):
        response = self.client.get('localhost:8000/login/')
        self.assertEqual(response.status_code, 404)

    def test_register_page(self):
        response = self.client.get('localhost:8000/register/')
        self.assertEqual(response.status_code, 404)

    def test_login_user(self):
        # Debe correr el servidor para probar el login
        client = Client()
        response = client.post('/accounts/login/', {'username': 'demo', 'password': 'demo1'})
        self.assertEqual(response.status_code, 200)

    def test_new_register_food_error_login(self):
    
        client = Client()
        response = client.post('/register_food/', {'type': 'A', 'primary_food': 'Comida 1',
        'secondary_food': 'Comida 2', 'drink': 'Agua', 'afters': 'N', 'tentation': 'S',
        'tentation_name': 'Otra Comida', 'was_hungry': 'N', 'date_register': '2021-08-17'})
        self.assertEqual(response.status_code, 302)
        
