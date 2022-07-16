from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db

search_routes = Blueprint('search', __name__)


@search_routes.route('/')
@login_required
def search_route():
    users = User.query.all()

    return jsonify([user.to_dict_username() for user in users])
