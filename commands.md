Flask Commands

pipenv shell
flask run

flask db migrate
flask db upgrade
flask seed all
flask seed undo

flask db downgrade

heroku run -a sea-coin flask seed all
heroku run -a sea-coin flask seed undo


- Create a database

CREATE USER quickpic_user WITH PASSWORD 'instagramclone' CREATEDB;
CREATE DATABASE quickpic_dev WITH OWNER quickpic_user;

heroku run -a quickspic flask seed all
