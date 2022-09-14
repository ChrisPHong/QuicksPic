Flask Commands

pipenv shell
flask run

flask db migrate
flask db upgrade
flask db downgrade
flask seed all
flask seed undo


heroku run -a quickspic flask seed all
heroku run -a quickspic flask seed undo


- Create a database

CREATE USER quickpic_user WITH PASSWORD 'instagramclone' CREATEDB;
CREATE DATABASE quickpic_dev WITH OWNER quickpic_user;

heroku run -a quickspic flask seed all



### Websocket
https://hackmd.io/oTn-ZTjcQRO5Ghbv9tO9ug

#### Documentation
https://flask-socketio.readthedocs.io/en/latest/
