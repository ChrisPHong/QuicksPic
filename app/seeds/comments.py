from xmlrpc.client import DateTime
from app.models import db, Comment, User
from datetime import datetime

def seed_comments():
    users = User.query.all()
    first_comment = [user for user in users if user.id in [3]]
    second_comment = [user for user in users if user.id in [1,3]]
    third_comment = [user for user in users if user.id in [1,2,3]]

    comment1 = Comment(
        user_id = 1,
        photo_id = 1,
        comments ='Hey! This is great picture!',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        comment_users=first_comment
    )
    comment2 = Comment(
        user_id = 2,
        photo_id = 2,
        comments ='Wonderful picture! Hope everyone does well',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        comment_users=second_comment
    )
    comment3 = Comment(
        user_id = 3,
        photo_id = 3,
        comments ="I don't like this picture",
        created_at = datetime.now(),
        updated_at = datetime.now(),
        comment_users=third_comment
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
