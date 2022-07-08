from .db import db


photos_likes = db.Table(

    "photos_likes",
    db.Model.metadata,
    db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False),
    db.Column('photos', db.Integer, db.ForeignKey('photos.id'), primary_key=True, nullable=False)
)

class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    caption = db.Column(db.String(2200), nullable=False)
    image = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    # Many-to-One relationship with Photos
    users = db.relationship('User', back_populates='photos')

    comments = db.relationship('Comment', back_populates='photos', cascade='all,delete')

    # Many-to-Many relationship with Photos
    photo_users = db.relationship('User', secondary=photos_likes, back_populates='user_photos')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'caption': self.caption,
            'image': self.image,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'photo_users': len(self.photo_users)
        }
