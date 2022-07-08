from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
    )
    em = User(
        username='em',
        email='em@aa.io',
        password='password',

    )

    chris = User(
        username='chris',
        email='chris@aa.io',
        password='password',

    )
    brian = User(
        username='brian',
        email='brian@aa.io',
        password='password',

    )
    uki = User(
        username='uki',
        email='uki@aa.io',
        password='password',

    )

    danny = User(
        username='danny',
        email='danny@aa.io',
        password='password',

    )

    db.session.add(demo)
    db.session.add(em)
    db.session.add(chris)
    db.session.add(brian)
    db.session.add(uki)
    db.session.add(danny)

    demo.to_follow(chris)
    demo.to_follow(em)
    demo.to_follow(uki)
    demo.to_follow(brian)
    em.to_follow(demo)
    em.to_follow(chris)
    chris.to_follow(em)
    chris.to_follow(brian)
    chris.to_follow(uki)
    brian.to_follow(em)
    brian.to_follow(demo)
    brian.to_follow(chris)
    brian.to_follow(uki)
    uki.to_follow(brian)
    uki.to_follow(chris)
    danny.to_follow(chris)
    danny.to_follow(demo)
    danny.to_follow(brian)
    danny.to_follow(uki)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
