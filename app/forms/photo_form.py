from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Watchlist
from flask_login import current_user


class PhotoForm(FlaskForm):

    caption = StringField('caption', validators=[DataRequired()])
    image = StringField('image', validators=[DataRequired()])
    
