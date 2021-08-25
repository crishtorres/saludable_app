# Pasos para desplegar

### Clonar repositorio
```bash
git clone https://github.com/crishtorres/saludable_app.git
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

### Ejecutar tests
```bash
python manage.py test
```

## Uso de la aplicación

1. Registrar usuario
2. Iniciar sesión con usuario creado
3. "Registrar alimentos", ingresar para empezar a utilizar
