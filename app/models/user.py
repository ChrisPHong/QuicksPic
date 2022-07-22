from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .photo import photos_likes
from .comment import comments_likes

followers = db.Table(
    'followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(2000))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)



    # One-to-Many relationship with Comments
    comments = db.relationship('Comment', back_populates='users')

    # One-to-Many relationship with Photos
    photos = db.relationship('Photo', back_populates='users')

    # many-to-many relationship between users and comments for likes
    user_comments = db.relationship('Comment', secondary=comments_likes, back_populates='comment_users', cascade='all,delete')

    # many-to-many relationship between users and photos for likes
    user_photos = db.relationship('Photo', secondary=photos_likes, back_populates='photo_users', cascade='all,delete')

    # many-to-many relationship between users and users for people
    follower = db.relationship('User', secondary=followers, primaryjoin=(followers.c.follower_id == id), secondaryjoin = (followers.c.followed_id == id), backref = db.backref('followers', lazy = 'dynamic'), lazy = 'dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
        }
    def to_dict_username(self):
        return {
            'id': self.id,
            'username': self.username,
            'profilePic': self.image
        }
    def to_follower_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile': self.image,
            "followers": [following.to_dict() for following in self.follower],
            "following_you":[followers.to_dict() for followers in self.followers]
        }

    def to_follow(self, user):
        if not self.to_following(user):
            self.follower.append(user)
            return self

    def to_unfollow(self, user):
        if self.to_following(user):
            self.follower.remove(user)
            return self

    def to_following(self, user):
        return self.follower.filter(followers.c.followed_id == user.id).count() > 0
