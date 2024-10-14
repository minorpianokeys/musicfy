from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

# Models go here!
class Track(db.Model, SerializerMixin):
    __tablename__ = 'tracks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    file_url = db.Column(db.String)
    description = db.Column(db.String)
    genre = db.Column(db.String)
    track_art = db.Column(db.String)
    artist = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    comments = db.relationship('Comment', back_populates='track', cascade='all, delete-orphan')
    user = db.relationship('User', back_populates='tracks')
    likes = db.relationship('Like', back_populates='track', cascade='all, delete-orphan')

    serialize_rules = ('-comments.track', '-user.tracks', '-comments.user', '-likes.user', '-like.tracks')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)

    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    track = db.relationship('Track', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    serialize_rules = ('-track.comments', '-user.comments', '-track.user',)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String)
    bio = db.Column(db.String)
    profile_picture = db.Column(db.String)

    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    tracks = db.relationship('Track', back_populates='user', cascade='all, delete-orphan')
    likes = db.relationship('Like', back_populates='user', cascade='all, delete-orphan')

    serialize_rules = ('-comments.user', '-tracks.user', '-comments.track', '-likes.track', '-likes.user',)

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError("Failed simple email validation")
        return address

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    

class Like(db.Model, SerializerMixin):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    track_id = db.Column(db.Integer, db.ForeignKey('tracks.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    track = db.relationship('Track', back_populates='likes')
    user = db.relationship('User', back_populates='likes')

    serialize_rules = ('-track.likes', '-user.likes',)