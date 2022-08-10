from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Photo, db
from app.forms.user_form import UserEditForm
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """

    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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


@user_routes.route('/followers', methods=['GET'])
def get_all_followers():

    return jsonify(current_user.to_follower_dict())


# This is for a specific profile and returns the user's data
# that'll update the profile page when following them on the profile page
@user_routes.route('/<int:follower_id>/profileFollow', methods=['POST'])
def user_profile_follower(follower_id):
    user_to_follow = User.query.get(follower_id)

    # This checks to see if the user already follows the user
    if user_to_follow in current_user.follower:
        current_user.follower.remove(user_to_follow)
        db.session.add(current_user)
        db.session.commit()

        return user_to_follow.to_follower_dict()
    # If it's not in the list, then it'll add it to the list and return that follower
    current_user.follower.append(user_to_follow)

    db.session.add(current_user)
    db.session.commit()


    return user_to_follow.to_follower_dict()


@user_routes.route("/<int:id>", methods=["PATCH"])
@login_required
def upload_image(id):
    user = User.query.get(current_user.id)

    form = UserEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # image = request.files["image"]
    # if "image" not in request.files:
    #     form['image'] = user_test.image


    # if not allowed_file(image.filename):
    #     return {"errors": "file type not permitted"}, 400

    # image.filename = get_unique_filename(image.filename)

    # upload = upload_file_to_s3(image)

    # if "url" not in upload:
    #     # if the dictionary doesn't have a url key
    #     # it means that there was an error when we tried to upload
    #     # so we send back that error message
    #     return upload, 400

    # url = upload["url"]
    # # flask_login allows us to get the current user from the request
    # # new_image = Photo(user=current_user, image=url)

    id = current_user.to_dict()['id']
    form.data['user_id'] = int(id)
    if form.validate_on_submit():
        user.name = form.data['name']
        user.website= form.data['website']
        user.bio= form.data['bio']

        # image = url,

        db.session.add(user)
        db.session.commit()
        print('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< THIS IS THE USER TO FOLLOWER TO DICT', user.to_follower_dict())
        return user.to_follower_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# def patch_photo(photo_id):
#     photo = Photo.query.get(photo_id)
#     form = PhotoForm()

#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         photo.caption = form.data['caption'],
#         photo.updatedAt = datetime.now()

#         db.session.add(photo)
#         db.session.commit()

#         return photo.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
