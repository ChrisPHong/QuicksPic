from .db import db

comments_likes = db.Table(

    "comments_likes",
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False),
    db.Column('comments', db.Integer, db.ForeignKey('comments.id'), primary_key=True, nullable=False)
)

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'))
    comments = db.Column(db.String(2200), nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    # one to many relationship
    users = db.relationship('User', back_populates='comments', lazy='joined')

    # one to many relationship
    photos = db.relationship('Photo', back_populates='comments')

    # many to many relationship
    comment_users = db.relationship('User', secondary=comments_likes, back_populates='user_comments')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'photoId': self.photo_id,
            'comments': self.comments,
            'createdAt': self.created_at.strftime("%b %d %Y"),
            'updatedAt': self.updated_at,
            'commentLikes': [likes.to_dict() for likes in self.comment_users],
            'username': self.users.to_dict_username()
        }
