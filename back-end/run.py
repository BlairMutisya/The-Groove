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

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'), nullable=False)
    review_message = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # Rating in stars
    user_first_name = db.Column(db.String(50), nullable=False)
    user_last_name = db.Column(db.String(50), nullable=False)

# Define roles
users = {
    "admin_user": {"role": "admin"},
    "regular_user": {"role": "user"}
}

# Load user callback for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Function to generate confirmation token
def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt='email-confirm')

# Function to confirm the token
def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email = serializer.loads(
            token,
            salt='email-confirm',
            max_age=expiration
        )
    except (SignatureExpired, BadSignature):
        return False
    return email

# Function to send confirmation email
def send_confirmation_email(user):
    token = generate_confirmation_token(user.email)
    confirm_url = url_for('confirm_email', token=token, _external=True)
    
    html_body = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body, html {{
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }}
        .container {{
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }}
        h2 {{
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }}
        .btn {{
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          text-align: center;
        }}
        p {{
          color: #666;
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 10px;
        }}
        .footer {{
          margin-top: 20px;
          text-align: center;
          color: #999;
        }}
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Email Verification</h2>
        <p>Hi {user.first_name} {user.last_name},</p>
        <p>Please click the button below to verify your email address:</p>
        <a class="btn" href="{confirm_url}">Verify Email</a>
        <p style="margin-top: 20px;">If you didn't request this, please ignore this email.</p>
        <p class="footer">This email was sent to {user.email} from The Groove. </p>
        <p class="footer">Please do not reply to this email.</p>
      </div>
    </body>
    </html>
    """
    msg = Message('Kindly Confirm Your Email Address', 
                  sender=("The Groove", app.config.get('MAIL_DEFAULT_SENDER', 'p6608665@gmail.com')),
                  recipients=[user.email])
    
    msg.html = html_body
    mail.send(msg)

# Error handling
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(IntegrityError)
def handle_integrity_error(error):
    db.session.rollback()
    return jsonify({'error': 'Integrity error, possibly a duplicate entry'}), 400

@app.errorhandler(NoResultFound)
def handle_no_result_found(error):
    return jsonify({'error': 'No result found'}), 404

# Route for email confirmation
@app.route('/confirm/<token>')
def confirm_email(token):
    email = confirm_token(token)
    if email:
        user = User.query.filter_by(email=email).first_or_404()
        user.verified = True
        db.session.commit()
        flash('Email confirmed! You can now log in.', 'success')
        return redirect(url_for('login'))
    else:
        flash('The confirmation link is invalid or has expired.', 'danger')
        return redirect(url_for('login'))
    
# Homepage route
@app.route('/')
def home():
    return ('Welcome to the Groove API'), 200
# User Registration
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'client')  # default role is 'client'

    if not all([first_name, last_name, email, password]):
        return jsonify({'error': 'Missing required fields'}), 400

    hashed_password = generate_password_hash(password)
    user = User(first_name=first_name, last_name=last_name, email=email,
                password=hashed_password, role=role)

    try:
        db.session.add(user)
        db.session.commit()
        send_confirmation_email(user)
        return jsonify({'message': 'User registered successfully, please check your email to confirm your address.'}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Email already registered'}), 400

# User Login
@app.route('/login', methods=['POST', 'GET'])

def login():
    if request.method == 'POST':
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Missing email or password'}), 400

        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            if not user.verified:
                return jsonify({'error': 'Email not verified'}), 400
            login_user(user)
            access_token = create_access_token(identity={'id': user.id, 'role': user.role})
            return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401

    elif request.method == 'GET':
        if current_user.is_authenticated:
            return jsonify({
                'id': current_user.id,
                'first_name': current_user.first_name,
                'last_name': current_user.last_name,
                'email': current_user.email,
                'role': current_user.role
            }), 200
        else:
            return jsonify({'error': 'User not authenticated'}), 401
