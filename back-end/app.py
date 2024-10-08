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
import re
from datetime import datetime, timedelta

# Initialize the Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
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
login_manager.login_view = 'signin'
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

    def check_password(self, password):
        return check_password_hash(self.password, password)

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

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    message = db.Column(db.Text, nullable=False)
    read = db.Column(db.Boolean, default=False)

class CreateBooking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    message = db.Column(db.Text, nullable=True)
    agreement = db.Column(db.Boolean, default=False)
    space_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    space_id = db.Column(db.Integer, nullable=False)
    space_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    space_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    def __repr__(self):
        return f"<Booking {self.first_name} {self.last_name}>"

# Define roles
users = {
    "admin_user": {"role": "admin"},
    "regular_user": {"role": "user"}
}

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "role": user.role
    } for user in users]), 200

# Get a user by ID
# @app.route('/users/<int:id>', methods=['GET'])
# def get_user(id):
#     user = User.query.get_or_404(id)
#     return jsonify({
#         "id": user.id,
#         "first_name": user.first_name,
#         "last_name": user.last_name,
#         "email": user.email,
#         "role": user.role
#     }), 200

# Update a user by ID
# @app.route('/users/<int:id>', methods=['PUT'])
# def update_user(id):
#     user = User.query.get_or_404(id)
#     data = request.json

#     user.first_name = data.get('first_name', user.first_name)
#     user.last_name = data.get('last_name', user.last_name)
#     user.email = data.get('email', user.email)
#     user.role = data.get('role', user.role)

#     if 'password' in data:
#         user.set_password(data['password'])

#     db.session.commit()
#     return jsonify({"message": "User updated successfully"}), 200



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

# @app.route('/users/<id>', methods=['DELETE'])
# def delete_user(id):
#     user = User.query.get_or_404(id)
    
#     try:
#         db.session.delete(user)
#         db.session.commit()
#         return jsonify({"message": "User deleted successfully."}), 200
#     except:
#         db.session.rollback()
#         return jsonify({"message": "Failed to delete user."}), 500
    
# Route for email confirmation
@app.route('/confirm/<token>')
def confirm_email(token):
    email = confirm_token(token)
    if email:
        user = User.query.filter_by(email=email).first_or_404()
        user.verified = True
        db.session.commit()
        flash('Email confirmed! You can now log in.', 'success')
        # Redirect to the client-side sign-in page
        return redirect('https://the-groove.vercel.app/signin')
    else:
        flash('The confirmation link is invalid or has expired.', 'danger')
        # Redirect to the client-side sign-in page even if the link is invalid
        return redirect('https://the-groove.vercel.app/signup')

def create_token(user):
    # Define the token's expiration time
    expiration_time = timedelta(days=1)
    
    # Create the token
    token = create_access_token(identity=user.id, expires_delta=expiration_time)
    return token


@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and user.check_password(data['password']):
        token = create_token(user)
        return jsonify({
            'token': token,
            'role': user.role
        }), 200
    return jsonify({'error': 'Invalid credentials or not an admin.'}), 401

# Homepage route
@app.route('/')
def home():
    return ('Welcome to the Groove API'), 200
# User Registration
def validate_password(password):
    if len(password) < 8:
        return "Password must be atleast 8 characters long."
    if not re.search(r'[A-Z]', password):
       return "Password must have at least one uppercase letter."
    if not re.search(r'[a-z]', password):
        return "Password must have at least one lowercase letter."
    if not re.search(r'[0-9]', password):
        return "Password must contain at least one digit."
    if not re.search(r'[\W_]', password):
        return "Password must contain at least one special character."
    return None
@app.route('/signup', methods=['POST', 'GET'])

def signup():
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'client')  # default role is 'client'

    if not all([first_name, last_name, email, password]):
        return jsonify({'error': 'Missing required fields'}), 400
   #validate password
    password_error = validate_password(password)
    if password_error:
     return jsonify({'error': password_error}), 400

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
@app.route('/signin', methods=['POST', 'GET'])

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


# User Logout
@app.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200

# Middleware for JWT Authentication
def jwt_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            return fn(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': str(e)}), 401
    return wrapper

# Admin Required Decorator
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Check if the user is authenticated
        if not current_user.is_authenticated:
            return jsonify({'error': 'Authentication required'}), 401

        # Check if the user has admin privileges
        if current_user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403

        # Call the wrapped function if all checks pass
        return fn(*args, **kwargs)

    return wrapper

# Get all users
# @app.route('/users', methods=['GET'])
# def get_users():
#     users = User.query.all()
#     return jsonify([{
#         "id": user.id,
#         "first_name": user.first_name,
#         "last_name": user.last_name,
#         "email": user.email,
#         "role": user.role
#     } for user in users]), 200

# Get a user by ID
@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify({
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "role": user.role
    }), 200

# Update a user by ID
@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.json

    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)
    user.role = data.get('role', user.role)

    if 'password' in data:
        user.set_password(data['password'])

    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# Delete a user by ID
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# Space CRUD operations
@app.route('/spaces', methods=['GET'])
def get_spaces():
    spaces = Space.query.all()
    return jsonify([{
        'id': space.id,
        'name': space.name,
        'location': space.location,
        'description': space.description,
        'price': space.price, 
        'rating': space.rating,
        'status': space.status,
        'image_url': space.image_url,
        'user_id': space.user_id
    } for space in spaces]), 200

@app.route('/spaces/<int:id>', methods=['GET'])
def get_space(id):
    space = Space.query.get_or_404(id)
    return jsonify({
        'id': space.id,
        'name': space.name,
        'location': space.location,
        'description': space.description,
        'price': space.price,  # Price in KSH
        'rating': space.rating,
        'status': space.status,
        'image_url': space.image_url,
        'user_id': space.user_id
    }), 200


@app.route('/spaces', methods=['POST'])
# @admin_required
def create_space():
    data = request.json
    name = data.get('name')
    description = data.get('description')
    location = data.get('location')
    price = data.get('price')  # Ensure price is provided
    image_url = data.get('image_url')
    status = data.get('status')
    rating = data.get('rating')
    user_id = data.get('user_id')

    if not all([name, description, location, price, status]):  # Include price in required fields
        return jsonify({'error': 'Missing required fields'}), 400

    space = Space(
        name=name,
        description=description,
        location=location,
        price=price,
        image_url=image_url,
        status=status,
        rating=rating,
        user_id=user_id
    )

    db.session.add(space)
    db.session.commit()
    return jsonify({'message': 'Space created successfully'}), 201

@app.route('/spaces/<int:id>', methods=['PUT'])
# @admin_required
def update_space(id):
    data = request.json
    space = Space.query.get_or_404(id)
    
    space.name = data.get('name', space.name)
    space.description = data.get('description', space.description)
    space.location = data.get('location', space.location)
    space.price = data.get('price', space.price)  # Update price if provided
    space.image_url = data.get('image_url', space.image_url)
    space.status = data.get('status', space.status)
    space.rating = data.get('rating', space.rating)
    
    db.session.commit()
    return jsonify({'message': 'Space updated successfully'}), 200


@app.route('/spaces/<int:id>', methods=['DELETE'])
# @admin_required
# @admin_required
def delete_space(id):
    space = Space.query.get_or_404(id)
    db.session.delete(space)
    db.session.commit()
    return jsonify({'message': 'Space deleted successfully'}), 200

@app.route('/create-bookings', methods=['POST', 'GET'])
def create_bookings():
    if request.method == 'POST':
        data = request.get_json()

        # Fetch space details from Space model
        space = Space.query.get(data.get('space_id'))
        if not space:
            return jsonify({'error': 'Space not found'}), 404

        new_booking = CreateBooking(
            first_name=data.get('firstName'),
            last_name=data.get('lastName'),
            email=data.get('email'),
            phone=data.get('phone'),
            message=data.get('message'),
            agreement=data.get('agreement', False),
            space_name=space.name,
            location=space.location,
            description=space.description,
            price=space.price,
            image_url=space.image_url,
            space_id=space.id
        )

        db.session.add(new_booking)
        db.session.commit()

        return jsonify({
            'id': new_booking.id,
            'first_name': new_booking.first_name,
            'last_name': new_booking.last_name,
            'email': new_booking.email,
            'phone': new_booking.phone,
            'message': new_booking.message,
            'agreement': new_booking.agreement,
            'space_name': new_booking.space_name,
            'location': new_booking.location,
            'description': new_booking.description,
            'price': new_booking.price,
            'image_url': new_booking.image_url,
            'created_at': new_booking.created_at
        }), 201

    elif request.method == 'GET':
        bookings = CreateBooking.query.all()
        return jsonify([
            {
                'id': booking.id,
                'first_name': booking.first_name,
                'last_name': booking.last_name,
                'email': booking.email,
                'phone': booking.phone,
                'message': booking.message,
                'agreement': booking.agreement,
                'space_name': booking.space_name,
                'location': booking.location,
                'description': booking.description,
                'price': booking.price,
                'image_url': booking.image_url,
                'created_at': booking.created_at
            }
            for booking in bookings
        ]), 200



@app.route('/bookings/<int:id>', methods=['GET'])
# @login_required
def get_booking(id):
    booking = BookedSpace.query.get_or_404(id)
    response = {
        'id': booking.id,
        'user_id': booking.user_id,
        'space_id': booking.space_id,
        'user_first_name': booking.user_first_name,
        'user_last_name': booking.user_last_name,
        'email': booking.email,
        'contact': booking.contact,
        'space_name': booking.space_name,
        'location': booking.location,
        'image_url': booking.image_url,
        'status': booking.status,
        'paid': booking.paid
    }
    return jsonify(response), 200

@app.route('/bookings/<int:id>', methods=['DELETE'])
# @login_required
def delete_booking(id):
    booking = BookedSpace.query.get_or_404(id)
    db.session.delete(booking)
    db.session.commit()
    return jsonify({'message': 'Booking deleted successfully'}), 200

# Payment CRUD operations
@app.route('/payments', methods=['POST'])
# @login_required
def create_payment():
    data = request.json
    booking_id = data.get('booking_id')
    amount = data.get('amount')
    date_paid = data.get('date_paid')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    contacts = data.get('contacts')
    payment_mode = data.get('payment_mode')
    message = data.get('message')

    if not all([booking_id, amount, date_paid, first_name, last_name, contacts, payment_mode]):
        return jsonify({'error': 'Missing required fields'}), 400

    payment = Payment(
        user_id=current_user.id,
        booking_id=booking_id,
        amount=amount,
        date_paid=datetime.fromisoformat(date_paid),
        first_name=first_name,
        last_name=last_name,
        contacts=contacts,
        payment_mode=payment_mode,
        message=message
    )

    db.session.add(payment)
    db.session.commit()
    return jsonify({'message': 'Payment created successfully'}), 201

@app.route('/payments/<int:id>', methods=['GET'])
@login_required
def get_payment(id):
    payment = Payment.query.get_or_404(id)
    return jsonify({
        'id': payment.id,
        'user_id': payment.user_id,
        'booking_id': payment.booking_id,
        'amount': payment.amount,
        'date_paid': payment.date_paid.isoformat(),
        'first_name': payment.first_name,
        'last_name': payment.last_name,
        'contacts': payment.contacts,
        'payment_mode': payment.payment_mode,
        'message': payment.message
    }), 200

@app.route('/payments/<int:id>', methods=['DELETE'])
@login_required
def delete_payment(id):
    payment = Payment.query.get_or_404(id)
    db.session.delete(payment)
    db.session.commit()
    return jsonify({'message': 'Payment deleted successfully'}), 200

# Review CRUD operations
# Create Review
@app.route('/spaces/<int:id>/reviews', methods=['POST'])
def create_review(id):
    data = request.json
    review_message = data.get('review_message')
    rating = data.get('rating')
    user_first_name = data.get('user_first_name')
    user_last_name = data.get('user_last_name')

    if not all([review_message, rating, user_first_name, user_last_name]):
        return jsonify({'error': 'Missing required fields'}), 400

    review = Review(
        user_id=current_user.id,
        space_id=id,  # Use the space ID from the URL
        review_message=review_message,
        rating=rating,
        user_first_name=user_first_name,
        user_last_name=user_last_name
    )

    db.session.add(review)
    db.session.commit()
    return jsonify({'message': 'Review created successfully'}), 201

# Get Reviews for a Space
@app.route('/spaces/<int:id>/reviews', methods=['GET'])
def get_reviews(id):
    reviews = Review.query.filter_by(space_id=id).all()
    reviews_data = [
        {
            'id': review.id,
            'user_id': review.user_id,
            'space_id': review.space_id,
            'reviewMessage': review.review_message,
            'rating': review.rating,
            'userFirstName': review.user_first_name,
            'userLastName': review.user_last_name
        }
        for review in reviews
    ]
    return jsonify(reviews_data), 200

# # Update Review
# @app.route('/spaces/<int:space_id>/reviews/<int:review_id>', methods=['PUT'])
# def update_review(space_id, review_id):
#     data = request.json
#     review = Review.query.get_or_404(review_id)
    
#     if review.space_id != space_id:
#         return jsonify({'error': 'Review does not belong to this space'}), 400
    
#     if 'review_message' in data:
#         review.review_message = data['review_message']
#     if 'rating' in data:
#         review.rating = data['rating']
#     if 'user_first_name' in data:
#         review.user_first_name = data['user_first_name']
#     if 'user_last_name' in data:
#         review.user_last_name = data['user_last_name']

#     db.session.commit()
#     return jsonify({'message': 'Review updated successfully'}), 200

# # Delete Review
# @app.route('/spaces/<int:space_id>/reviews/<int:review_id>', methods=['DELETE'])
# @login_required
# def delete_review(space_id, review_id):
#     review = Review.query.get_or_404(review_id)
    
#     if review.space_id != space_id:
#         return jsonify({'error': 'Review does not belong to this space'}), 400

#     db.session.delete(review)
#     db.session.commit()
#     return jsonify({'message': 'Review deleted successfully'}), 200


@app.route('/contact', methods=['POST'])
def create_contact():
    data = request.json
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    message = data.get('message')
  
    if not all([name, phone, email, message]):
        return jsonify({'error': 'Missing required fields'}), 400

    contact = Contact(
        name=name,
        phone=phone,
        email=email,
        message=message
    )
    db.session.add(contact)
    db.session.commit()
    return jsonify({'message': 'Contact created successfully'}), 201

@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    return jsonify([
        {
            'id': contact.id,
            'name': contact.name,
            'phone': contact.phone,
            'email': contact.email,
            'message': contact.message
        } for contact in contacts
    ]), 200


# @app.route('/create-bookings', methods=['POST', 'GET'])
# def create_bookings():
#     if request.method == 'POST':
#         data = request.get_json()

#         # Fetch space details from Space model
#         space = Space.query.get(data.get('space_id'))
#         if not space:
#             return jsonify({'error': 'Space not found'}), 404

#         new_booking = CreateBooking(
#             first_name=data.get('firstName'),
#             last_name=data.get('lastName'),
#             email=data.get('email'),
#             phone=data.get('phone'),
#             message=data.get('message'),
#             agreement=data.get('agreement', False),
#             space_name=space.name,
#             location=space.location,
#             description=space.description,
#             price=space.price,
#             image_url=space.image_url,
#             space_id=space.id
#         )

#         db.session.add(new_booking)
#         db.session.commit()

#         return jsonify({
#             'id': new_booking.id,
#             'first_name': new_booking.first_name,
#             'last_name': new_booking.last_name,
#             'email': new_booking.email,
#             'phone': new_booking.phone,
#             'message': new_booking.message,
#             'agreement': new_booking.agreement,
#             'space_name': new_booking.space_name,
#             'location': new_booking.location,
#             'description': new_booking.description,
#             'price': new_booking.price,
#             'image_url': new_booking.image_url,
#             'created_at': new_booking.created_at
#         }), 201

#     elif request.method == 'GET':
#         bookings = CreateBooking.query.all()
#         return jsonify([
#             {
#                 'id': booking.id,
#                 'first_name': booking.first_name,
#                 'last_name': booking.last_name,
#                 'email': booking.email,
#                 'phone': booking.phone,
#                 'message': booking.message,
#                 'agreement': booking.agreement,
#                 'space_name': booking.space_name,
#                 'location': booking.location,
#                 'description': booking.description,
#                 'price': booking.price,
#                 'image_url': booking.image_url,
#                 'created_at': booking.created_at
#             }
#             for booking in bookings
#         ]), 200

@app.route('/contacts/<int:id>', methods=['PATCH'])
def mark_as_read(id):
    contact = Contact.query.get_or_404(id)
    contact.read = True
    db.session.commit()
    return jsonify({'id': contact.id, 'read': contact.read})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000)) 
    app.run(debug=True, host='0.0.0.0', port=port)