from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Photo
from flask_login import current_user


class CommentForm(FlaskForm):

    user_id = IntegerField('user_id', validators=[DataRequired()])
    photo_id = IntegerField('photo_id', validators=[DataRequired()])
    comments = StringField('comments', validators=[DataRequired()])
    created_at = DateField('created_at')
    updated_at = DateField('updated_at')
