#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Track, Comment, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing DB...")
        Track.query.delete()
        Comment.query.delete()
        User.query.delete()
        print("Starting seed...")
        track1 = Track(
            title = "Emerald Hearts",
            file_url = "",
            description = "Rock song about love",
            genre = "Rock",
            track_art = "https://www.inspiredgenerations.com/img/Items/1422_355_may-emerald.jpg",
            user_id = "1"
        )
        track2 = Track(
            title = "My Kink is Karma",
            file_url = "",
            description = "getting back at your ex",
            genre = "Pop",
            track_art = "https://images.genius.com/68122940ad2367abe956e216e133c528.1000x1000x1.png",
            user_id = "1"
        )

        comment1 = Comment(
            body = "sounds good",
            track_id = "1"
        )
        comment2 = Comment(
            body = "meh",
            track_id = "1"
        )

        user1 = User(
            email = "rawr@gmail.com",
            _password_hash = "123",
            username = "minorpianokeys",
            bio = "Up and coming artist in NYC",
            profile_picture = "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
        )

        print("Adding Tracks to DB...")
        db.session.add_all([track1, track2, comment1, comment2, user1])
        db.session.commit()
        print("Complete.")