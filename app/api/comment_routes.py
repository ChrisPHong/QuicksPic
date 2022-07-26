from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms.comment_form import CommentForm
from datetime import datetime


comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """

    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Users can get all the comments of the users they are following
@comment_routes.route('/<int:photo_id>')
@login_required
def get__comments(photo_id):

    comments = Comment.query.filter(Comment.photo_id == photo_id).all()
    return jsonify([comment.to_dict() for comment in comments])


# # Users can update their comment
@comment_routes.route('/<int:comment_id>', methods=['PATCH'])
def patch_comment(comment_id):
    comment = Comment.query.get(comment_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment.comments = form.data['comments']
        comment.updated_at = datetime.now()

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Users can delete their comment
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    db.session.delete(comment)
    db.session.commit()

    return comment.to_dict()




@comment_routes.route("/", methods=["POST"])
@login_required
def create_comment():

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_comment = Comment(
            user_id = form.data['user_id'],
            photo_id = form.data['photo_id'],
            comments = form.data['comments'],
            created_at = datetime.now(),
            updated_at = datetime.now()

        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:comment_id>/likes', methods=['POST'])
def like_comment(comment_id):
    comment = Comment.query.get(comment_id)

    # This checks to see if the user already liked the comment
    if current_user in comment.comment_users:
        comment.comment_users.remove(current_user)
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    # If it's not in the list, then it'll add it to the list and return that comment
    comment.comment_users.append(current_user)

    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()
