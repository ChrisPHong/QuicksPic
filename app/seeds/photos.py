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
        image='https://images.unsplash.com/photo-1509909756405-be0199881695?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=first_photo
    )
    photo2 = Photo(
        user_id = 2,
        caption="waku waku",
        image='https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=second_photo
    )
    photo4 = Photo(
        user_id = 4,
        caption='Valo?',
        image='https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=second_photo
    )
    photo5 = Photo(
        user_id = 5,
        caption='Stunning.',
        image='https://plus.unsplash.com/premium_photo-1669750791963-ec6f3a565fb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=third_photo
    )
    photo6 = Photo(
        user_id = 6,
        caption='Comfort',
        image='https://images.unsplash.com/photo-1573583182490-a532db7377b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=third_photo
    )
    photo3 = Photo(
        user_id = 3,
        caption='Welcome to QuicksPic!',
        image='https://images.unsplash.com/photo-1595206133361-b1fe343e5e23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        created_at = datetime.now(),
        updated_at = datetime.now(),
        photo_users=first_photo
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
