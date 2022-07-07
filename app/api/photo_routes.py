from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

photo_routes = Blueprint('photos', __name__)

def validation_errors_to_error_messages(validation_errors):
    """

    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Users can get all their watchlists
@photo_routes.route('/<int:id>')
@login_required
def get__photos():
    user = User.query.get(id)
    users = User.query.all()



# Users can create a new watchlist
@photo_routes.route('/', methods=['POST'])
# @login_required
def post_photo():
    pass

# Users can update their watchlist
@photo_routes.route('/<int:id>', methods=['PATCH'])
def patch_photo(id):
    pass


# Users can delete their watchlist
@photo_routes.route('/<int:id>', methods=['DELETE'])
def delete_photo(id):
    pass
