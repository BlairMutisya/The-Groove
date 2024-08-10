from flask import Flask
from dotenv import load_dotenv
import os
from datetime import timedelta
# from flask_session import Session
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager, decode_token

# Load variables from .env file
load_dotenv()

app = Flask(__name__)
# Configure the app with variables from the .env file
class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'  # Example URI for SQLite
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Optional, but recommended to disable
    # Other configuration variables