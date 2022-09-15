from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Message
from datetime import datetime


message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def get_messages():
    print(current_user.messages)
    pass
