from app.models import db, Photo, User
from datetime import datetime
from app.models.photo import photos_likes

def seed_photos():
    users = User.query.all()
    first_photo = [user for user in users if user.id in [3]]
    second_photo = [user for user in users if user.id in [1,3]]
    third_photo = [user for user in users if user.id in [1,2,3]]

    photo1 = Photo(
        user_id = 1,
        caption='Smile for the Camera',
        image='https://quickspic.s3.us-west-1.amazonaws.com/DSC_9287.jpg',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=first_photo
    )
    photo2 = Photo(
        user_id = 2,
        caption="waku waku",
        image='https://quickspic.s3.us-west-1.amazonaws.com/bumblebee.jpg',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=second_photo
    )
    photo3 = Photo(
        user_id = 3,
        caption='Welcome to QuicksPic!',
        image='https://quickspic.s3.us-west-1.amazonaws.com/IMG_5514-RETOUCHED.jpg',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=first_photo
    )
    photo4 = Photo(
        user_id = 4,
        caption='Valo?',
        image='https://quickspic.s3.us-west-1.amazonaws.com/gaming.jpg',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=second_photo
    )
    photo5 = Photo(
        user_id = 5,
        caption='Stunning.',
        image='https://quickspic.s3.us-west-1.amazonaws.com/serbia.jpg',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=third_photo
    )
    photo6 = Photo(
        user_id = 6,
        caption='Comfort',
        image='https://quickspic.s3.us-west-1.amazonaws.com/fashion.jpg',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=third_photo
    )

    db.session.add(photo1)
    db.session.add(photo2)
    db.session.add(photo4)
    db.session.add(photo5)
    db.session.add(photo6)
    db.session.add(photo3)
    db.session.commit()

def undo_photos():
    db.session.execute('TRUNCATE photos RESTART IDENTITY CASCADE;')
    db.session.commit()
