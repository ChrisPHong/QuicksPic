from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use')

def email_needs_period(form, field):
    email = field.data
    if '.' not in email:
        raise ValidationError('Email needs a .net/.com/.io/.org')

def email_needs_at(form, field):
    email = field.data
    if '@' not in email:
        raise ValidationError('Email needs an @ symbol in your Email')

def same_password(form, field):
    print(field.data, "<<<<<<<<<<<<<<<<<<< BACKEND")
    repeat_password = field.data
    # if repeat_password != password
    pass



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, email_needs_period, email_needs_at])
    password = StringField('password', validators=[DataRequired()])
    repeat_password = StringField('repeat_password', validators=[DataRequired(), same_password])
