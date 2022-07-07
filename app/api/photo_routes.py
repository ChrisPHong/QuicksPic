from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Photo
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
    following_list = user.follower
    print(' <<<<<<<<<<<<<<<<<<<<<<<<<<< FOLLOWINGLIST >>>>>>>>>>>>>>>>>', following_list.to_dict())
    users = User.query.all()
    print(users)


# Users can update their photo
@photo_routes.route('/<int:id>', methods=['PATCH'])
def patch_photo(id):
    pass


# Users can delete their photo
@photo_routes.route('/<int:id>', methods=['DELETE'])
def delete_photo(id):
    pass


@photo_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Photo(user=current_user, url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"image": url}
