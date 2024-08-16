from flask import Flask
from flask_mail import Mail
from flask_login import LoginManager
from itsdangerous import URLSafeTimedSerializer
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db  # Ensure your models are imported correctly

app = Flask(__name__)
app.config.from_object('config')  # Load your configuration

# Initialize extensions
db.init_app(app)
CORS(app)  # You can customize CORS here if needed
mail = Mail(app)
login_manager = LoginManager(app)

# Initialize the serializer with your app's secret key
serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])

# Import routes after app is created
from run import app

# Create tables in the database
with app.app_context():
    db.create_all()
