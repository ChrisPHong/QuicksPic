from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from itsdangerous import json
from app.models import User, db, Photo, Comment
from app.forms.photo_form import PhotoForm
from datetime import datetime
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

photo_routes = Blueprint('photos', __name__)

def validation_errors_to_error_messages(validation_errors):
    """

    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Users can get all the photos of the users they are following
@photo_routes.route('/<int:id>')
@login_required
def get__photos(id):
    # get the current user and check to see which people they are following, from that list we get all the photos and have them displayed on the news feed
    user = User.query.get(id)

    # These are the people that we're following
    following_list = [int(follower.get_id()) for follower in user.follower]
    # following_lists = [follower for follower in user.follower]

    # This gives us the id's of all the followers that we're following
    # followers_only = [int(follower.get_id()) for follower in following_lists]
    # print('<<<<<<<<<<<<<< SAME? theory', followers_only)

    # Run a for loop with the photo query inside that checks if that user you're following owns that photo. Put that into another variable in order to return it to the front end.
    # filter by date and then append to photos list


    photos = []
    for i in range(len(following_list)):
        follower_id = following_list[i]
        photo = Photo.query.filter(Photo.user_id == follower_id).all()
        user_photo = Photo.query.filter(Photo.user_id == user.id).all()
        if(len(photo) > 0):
            photos.extend(photo)
            photos.extend(user_photo)

    return jsonify([photo.to_dict() for photo in photos])


# # Users can update their photo
@photo_routes.route('/<int:photo_id>', methods=['PATCH'])
def patch_photo(photo_id):
    photo = Photo.query.get(photo_id)
    form = PhotoForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        photo.caption = form.data['caption'],
        photo.updatedAt = datetime.now()

        db.session.add(photo)
        db.session.commit()

        return photo.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Users can delete their photo
@photo_routes.route('/<int:photo_id>/delete', methods=['DELETE'])
def delete_photo(photo_id):
    photo = Photo.query.get(photo_id)

    db.session.delete(photo)
    db.session.commit()

    return photo.to_dict()




@photo_routes.route("/", methods=["POST"])
@login_required
def upload_image():

    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    # if "image" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        # return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # new_image = Photo(user=current_user, image=url)

    id = current_user.to_dict()['id']
    form.data['user_id'] = int(id)
    if form.validate_on_submit():
        new_photo = Photo(
            user_id = int(id),
            caption=form.data['caption'],
            image = url,
            created_at = datetime.now(),
            updated_at = datetime.now()

        )
        db.session.add(new_photo)
        db.session.commit()
        return new_photo.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



# This is to create a like
@photo_routes.route('/<int:photo_id>/likes', methods=['POST'])
def like_photo(photo_id):
    photo = Photo.query.get(photo_id)

    # This checks to see if the user already liked the photo
    if current_user in photo.photo_users:
        photo.photo_users.remove(current_user)
        db.session.add(photo)
        db.session.commit()
        return photo.to_dict()
    # If it's not in the list, then it'll add it to the list and return that photo
    photo.photo_users.append(current_user)

    db.session.add(photo)
    db.session.commit()

    return photo.to_dict()
