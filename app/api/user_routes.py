from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Photo, db

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

    return {'user': user.to_follower_dict(), 'photos':[photo.to_dict() for photo in photos]}


@user_routes.route('/<int:follower_id>/follow', methods=['POST'])
def user_follow(follower_id):
    user_to_follow = User.query.get(follower_id)

    # This checks to see if the user already follows the user
    if user_to_follow in current_user.follower:
        current_user.follower.remove(user_to_follow)
        db.session.add(current_user)
        db.session.commit()

        return current_user.to_follower_dict()
    # If it's not in the list, then it'll add it to the list and return that follower
    current_user.follower.append(user_to_follow)

    db.session.add(current_user)
    db.session.commit()


    return current_user.to_follower_dict()
