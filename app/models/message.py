from .db import db

users_messages = db.Table(

    "users_messages",
    db.Model.metadata,
    db.Column('from_user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('to_user_id', db.Integer, db.ForeignKey('users.id'))
)

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    message = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    messager = db.relationship('User', secondary=users_messages, primaryjoin=(users_messages.c.from_user_id == id), secondaryjoin = (users_messages.c.to_user_id == id), backref = db.backref('users_messages', lazy = 'dynamic'), lazy = 'dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'messages': self.message,
            'createdAt': self.created_at.strftime("%b %d %Y"),
            'updatedAt': self.updated_at
        }
