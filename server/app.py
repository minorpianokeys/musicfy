#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Track, Comment, User, Like

class Tracks(Resource):

    def get(self):
        tracks = [t.to_dict() for t in Track.query.all()]
        return tracks, 200
    
    def post(self):
        try:
            new_track = Track(
                title = request.json['title'],
                file_url = request.json['file_url'],
                description = request.json['description'],
                genre = request.json['genre'],
                track_art = request.json['track_art'],
                artist = request.json['artist'],
                user_id = request.json['user_id']
            )

            db.session.add(new_track)
            db.session.commit()
            return new_track.to_dict(), 201
        
        except:
            return {"errors": ["validation errors"]}, 400
    
api.add_resource(Tracks, '/tracks')

class TracksByID(Resource):

    def get(self, id):
        track = Track.query.filter_by(id=id).first()
        return track.to_dict(), 200

api.add_resource(TracksByID, '/tracks/<int:id>')

class Comments(Resource):

    def get(self):
        comments = [c.to_dict() for c in Comment.query.all()]
        return comments, 200
    
    def post(self):
        try:
            new_comment = Comment(
                body = request.json['body'],
                track_id = request.json['track_id'],
                user_id = request.json['user_id']
            )
            db.session.add(new_comment)
            db.session.commit()
            return new_comment.to_dict(), 201
        except:
            return {"errors": ["validation errors"]}, 400
    
api.add_resource(Comments, '/comments')

class CommentsById(Resource):

    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()
        return comment.to_dict(), 200
    
api.add_resource(CommentsById, '/comments/<int:id>')

class Users(Resource):

    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200
    
api.add_resource(Users, '/users')

class UsersById(Resource):

    def get(self, id):
        user = User.query.filter_by(id=id).first()
        return user.to_dict(), 200
    
    def patch(self, id):
        try:
            user = User.query.filter_by(id=id).first()
            if user:
                for attr in request.json:
                    setattr(user, attr, request.json[attr])
                
                db.session.add(user)
                db.session.commit()
                return user.to_dict(), 202
            return {"error": "Review not found"}, 404
        except:
            return {"errors": ["validation errors"]}, 400
        
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return {}, 204
        return {"error": "Review not found"}, 404
    
api.add_resource(UsersById, '/users/<int:id>')

class Signup(Resource):

    def post(self):
        user = User(
            email=request.json['email'],
            username=request.json['username'],
            bio=request.json['bio'],
            profile_picture=request.json['profile_picture'],
        )

        user.password_hash = request.json['password']

        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        
        except:

            return {'error': '422 Unprocessable Entity'}, 422

api.add_resource(Signup, '/signup', endpoint='signup')

class Login(Resource):
    def post(self):
        email = request.get_json()['email']
        password = request.get_json()['password']

        user = User.query.filter(User.email == email).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        
        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout')

class CheckSession(Resource):
    def get(self):
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        else:
            return {"message": "401: Not Authorized"}, 401
        
api.add_resource(CheckSession, '/check_session')

class Likes(Resource):

    def get(self, track_id):
        likes = [like.to_dict() for like in Like.query.filter_by(track_id=track_id).all()] 

        return likes, 200

    def post(self, track_id):
        user_id = session['user_id']


        existing_like = Like.query.filter_by(track_id=track_id, user_id=user_id).first()
        if existing_like:
            return {"message": "Already liked"}, 200
        like = Like(
            user_id = session['user_id'],
            track_id = request.json['track_id']
        )
        print(like)
        db.session.add(like)
        db.session.commit()

        return like.to_dict(), 201

api.add_resource(Likes, '/tracks/<int:track_id>/like')

class Unlikes(Resource):
    def delete(self, track_id):
        user_id = session['user_id']
        like = Like.query.filter_by(track_id=track_id, user_id=user_id).first()
        print(like)
        
        if like:
            db.session.delete(like)
            db.session.commit()
            return {}, 204
        return {"error": "Like not found"}, 404
    
api.add_resource(Unlikes, '/tracks/<int:track_id>/unlike')

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

