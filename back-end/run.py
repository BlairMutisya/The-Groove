import secrets
import os
from datetime import datetime
from functools import wraps
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session, abort
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_session import Session
from sqlalchemy.exc import IntegrityError, NoResultFound
from werkzeug.utils import secure_filename
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, verify_jwt_in_request, get_jwt_identity
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'p6608665@gmail.com'
app.config['MAIL_PASSWORD'] = 'waxg umor dfel ucpo'
app.config['MAIL_DEFAULT_SENDER'] = 'p6608665@gmail.com'
app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['JWT_SECRET_KEY'] = secrets.token_hex(16)

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
mail = Mail(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
jwt = JWTManager(app)
Session(app)
CORS(app)

# Define models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    verified = db.Column(db.Boolean, default=False)
    role = db.Column(db.String(10), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    spaces = db.relationship('Space', backref='user', lazy=True)
    bookings = db.relationship('BookedSpace', backref='user', lazy=True)
    payments = db.relationship('Payment', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)

    def get_id(self):
        return str(self.id)

class Space(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    price = db.Column(db.Float, nullable=False) 
    status = db.Column(db.String(10), nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    bookings = db.relationship('BookedSpace', backref='space', lazy=True)
    reviews = db.relationship('Review', backref='space', lazy=True)
    role = db.Column(db.String(20), default='admin')

class BookedSpace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'), nullable=False)
    user_first_name = db.Column(db.String(50), nullable=False)
    user_last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(50), nullable=False)
    space_name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False) 
    location = db.Column(db.String(200), nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    status = db.Column(db.String(10), nullable=False)
    paid = db.Column(db.Boolean, default=False)
    # start_time = db.Column(db.DateTime, nullable=False)
    # end_time = db.Column(db.DateTime, nullable=False)

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date_paid = db.Column(db.DateTime, nullable=False)
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    contacts = db.Column(db.String(100), nullable=False)
    payment_mode = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=True)
