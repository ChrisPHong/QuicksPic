Flask Commands

pipenv shell
flask run

flask db migrate
flask db upgrade
flask db downgrade
flask seed all
flask seed undo


heroku run -a quickspic flask db migrate
heroku run -a quickspic flask db downgrade
heroku run -a quickspic flask db upgrade
heroku run -a quickspic flask seed all
heroku run -a quickspic flask seed undo


- Create a database

CREATE USER quickpic_user WITH PASSWORD 'instagramclone' CREATEDB;
CREATE DATABASE quickpic_dev WITH OWNER quickpic_user;

heroku run -a quickspic flask seed all
