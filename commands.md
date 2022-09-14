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


Things to do
- create a messages table that includes the user, the userId, and the messages, and the date for each person.
- Once the tables are created, make seed data and make sure they post on postbird
- Then figure out the CRUD for the messages
- Create a reducer for it??? This is something to talk with Brian about.
