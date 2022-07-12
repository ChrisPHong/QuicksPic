from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Photo

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    photos = Photo.query.filter(Photo.user_id == user.id).all()
    print(user, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<user  >>>>>>>>>>>>>>>>>')

    print(photos, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<< userPHOTO >>>>>>>>>>>>>>>>>')
    return {'user': user.to_dict(), 'photos':[photo.to_dict() for photo in photos]}
