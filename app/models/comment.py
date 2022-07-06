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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'), nullable=False)
    comments = db.Column(db.String(2200), nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    # one to many relationship
    users = db.relationship('User', back_populates='comments')

    # one to many relationship
    photos = db.relationship('Photo', back_populates='comments')

    # many to many relationship
    comment_users = db.relationship('User', secondary=comments_likes, back_populates='user_comments', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'photoId': self.photo_id,
            'caption': self.caption,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
