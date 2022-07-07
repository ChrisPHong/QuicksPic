from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Photo
from flask_login import current_user


class PhotoForm(FlaskForm):

    user_id = IntegerField('user_id', validators=[DataRequired()])
    caption = StringField('caption', validators=[DataRequired()])
    image = StringField('image', validators=[DataRequired()])
    created_at = DateField('created_at')
    updated_at = DateField('updated_at')
