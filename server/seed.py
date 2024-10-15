#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Track, Comment, User, Like

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing DB...")
        Track.query.delete()
        Comment.query.delete()
        User.query.delete()
        Like.query.delete()
        print("Starting seed...")
        # Create Users
        user1 = User(
            email="alice@example.com",
            username="Alice",
            bio="I love indie music and sharing tracks.",
            profile_picture="https://rachelannc.com/wp-content/uploads/2022/01/02-miley-cryus-press-cr-40vijatm-2021-billboard-1548-1634571667.jpg.webp"
        )
        user1.password_hash = "123"  # This will be hashed automatically

        user2 = User(
            email="bob@example.com",
            username="Bob",
            bio="A musician sharing my latest creations.",
            profile_picture="https://www.gannett-cdn.com/presto/2021/09/10/PNAS/6f88bc76-20f6-4131-a52a-f403b6118211-_images_uploads_gallery_WillieJones_creditMatthewBerinato_54808Redit.jpg"
            )
        user2.password_hash = "123"
        # Add users to session
        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()

        # Create Tracks
        track1 = Track(
            title="Summer Vibes",
            file_url="http://res.cloudinary.com/dlmqqypq1/video/upload/v1728934478/tadjin7vfgjepautdvni.mp3",
            description="A chill, relaxing track for summer evenings.",
            genre="Indie",
            track_art="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJljkF8OxrQptuUTX1jIWTsAODrY26HK7LUQ&s",
            artist="Alice",
            user_id=user1.id
        )

        track2 = Track(
            title="Rock Anthem",
            file_url="http://res.cloudinary.com/dlmqqypq1/video/upload/v1728934590/ol4a5reolfildduhwpp3.mp3",
            description="A high-energy rock anthem.",
            genre="Rock",
            track_art="https://qodeinteractive.com/magazine/wp-content/uploads/2020/06/16-Tame-Impala.jpg",
            artist="Bob",
            user_id=user2.id
        )

        # Add tracks to session
        db.session.add(track1)
        db.session.add(track2)
        db.session.commit()

        # Create Comments
        comment1 = Comment(
            body="Love this track! Great vibes.",
            track_id=track1.id,
            user_id=user2.id
        )

        comment2 = Comment(
            body="This rocks!",
            track_id=track2.id,
            user_id=user1.id
        )

        # Add comments to session
        db.session.add(comment1)
        db.session.add(comment2)
        db.session.commit()

        # Create Likes
        like1 = Like(
            track_id=track1.id,
            user_id=user2.id
        )

        like2 = Like(
            track_id=track2.id,
            user_id=user1.id
        )

        # Add likes to session
        db.session.add(like1)
        db.session.add(like2)
        db.session.commit()
        print("Complete.")