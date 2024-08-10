from flask import Flask
from flask_mail import Mail
from flask_login import LoginManager
from itsdangerous import URLSafeTimedSerializer
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from app.models import db  # Ensure your models are imported correctly

app = Flask(__name__)




app = Flask(__name__)
app.config.from_object('config')