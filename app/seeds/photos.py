from app.models import db, Photo, User
from datetime import datetime

def seed_photo():
    users = User.query.all()
    first_photo = [user for user in users if user.id in [3]]
    second_photo = [user for user in users if user.id in [1,3]]
    third_photo = [user for user in users if user.id in [1,2,3]]

    photo1 = Photo(
        user_id = 1,
        caption='I cant believe that just happened right now...',
        image='',
        created_at = datetime.now(),
        updated = datetime.now(),
        photo_users=first_photo
    )
    photo2 = Photo(
        user_id = 2,
        caption="WOAH!!! I'M ON TOP OF THE WORLD!",
        image='',
        created_at = datetime.now(),
        updated = datetime.now(),
        photos_users=second_photo
    )
    photo3 = Photo(
        user_id = 3,
        caption='Did this really happen??!! That is insane',
        image='',
        created_at = datetime.now(),
        updated = datetime.now(),
        photos_users=third_photo
    )

    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo3)
    db.session.commit()

def undo_photo():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
