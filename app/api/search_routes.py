from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

search_routes = Blueprint('search', __name__)


@search_routes.route('/')
@login_required
def search_route():
    users = User.query.all()
    return jsonify([user.to_dict_username() for user in users])
