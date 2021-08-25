# Pasos para desplegar

### Clonar repositorio
```bash
git clone https://github.com/crishtorres/saludable_app.git
cd saludable_app
```

### Instalar entorno virtual
```bash
# Windows
pip install virtualenv

# Linux
sudo pip3 install virtualenv

```

### Crear y activar entorno virtual
```bash
# Windows
virtualenv venv -p python3
cd venv/Scripts
activate

# Linux
python3 -m venv virtualenv
source venv/bin/activate
```

### Instalar django y dependencias necesarias
```bash
# En linux utilizar pip3
# Posicionarse en la raiz del proyecto
pip install -r requirements.txt
```

### Ejecutar migraciones y lanzar servidor
```bash
# En linux utilizar python3
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Navegar a http://localhost:8000


### Ejecutar tests
```bash
python manage.py test
```

## Pantallas
![login](https://github.com/crishtorres/saludable_app/blob/main/static/images/login.png?raw=true)
![register](https://github.com/crishtorres/saludable_app/blob/main/static/images/register.png?raw=true)
![dashboard](https://github.com/crishtorres/saludable_app/blob/main/static/images/dashboard.png?raw=true)
![add_food](https://github.com/crishtorres/saludable_app/blob/main/static/images/add_food.png?raw=true)
![add_food_2](https://github.com/crishtorres/saludable_app/blob/main/static/images/add_food2.png?raw=true)
![drink](https://github.com/crishtorres/saludable_app/blob/main/static/images/drink.png?raw=true)
