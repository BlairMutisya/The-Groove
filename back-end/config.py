from flask import Flask
from dotenv import load_dotenv
import os
from datetime import timedelta
# from flask_session import Session
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager, decode_token