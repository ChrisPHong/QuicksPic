from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class UserEditForm(FlaskForm):

    website = StringField('website')
    bio = StringField('bio')
    name = StringField('name')
