import os
from urllib import response
from flask import (
    Flask, render_template,
    request, jsonify)
from datetime import date, datetime
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import datetime as dt
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin
from datetime import date

if os.path.exists("env.py"):
    import env


app = Flask(__name__)
cors = CORS(app)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")
app.config['CORS_Headers'] = 'Content-Type'
mongo = PyMongo(app)


# retrive all date 
@app.route('/')
@cross_origin()
def home():
    return render_template('index.html')


@app.route('/posts')
@cross_origin()
def posts():
    posts = mongo.db.posts.find()
    resp = dumps(posts)
    return resp


# # get a single post
@app.route('/<post_id>', methods=["GET"])
def getPost(post_id):
    post = mongo.db.posts.find_one({"_id": ObjectId(post_id)})
    resp = dumps(post)
    return resp


# add a new post
@app.route('/add_post', methods=['POST'])
def add_post():
    a_datetime = datetime.now()
    formatted_datetime = a_datetime.isoformat()
    json_datetime = dumps(formatted_datetime)
    _json = request.json
    creator = _json['creator'],
    title = _json['title'],
    imageUrl = _json['imageUrl'],
    content = _json['content'],
    createdAt = json_datetime
    # validate the received values
    if request.method == 'POST':
        post = mongo.db.posts.insert_one(
            {'title': title, 'imageUrl': imageUrl, 'content': content,
             'creator': creator, 'createdAt': createdAt})
        resp = jsonify('Post added successfully!')
        resp.status_code = 200
        return resp


# update post
@app.route('/update/<post_id>', methods=['PUT'])
def update_post(post_id):
    a_datetime = datetime.now()
    formatted_datetime = a_datetime.isoformat()
    json_datetime = dumps(formatted_datetime)
    _json = request.json
    creator = _json['creator']
    content = _json['content']
    title = _json['title']
    imageUrl = _json['imageUrl']
    updatedAt = json_datetime
# validate the received values
    if request.method == 'PUT':
        mongo.db.posts.update_one({'_id': ObjectId(post_id)}, {'$set': {
                                   'creator': creator, 'title': title,
                                   'imageUrl': imageUrl, 'content': content,
                                   'updatedAt': updatedAt}})
        resp = jsonify('Post update successfully')
        resp.status = 200
        return resp


# delete post
@app.route('/delete/<post_id>', methods=["DELETE"])
def deletePost(post_id):
    mongo.db.posts.delete_one({"_id": ObjectId(post_id)})
    resp = jsonify('Post deleted successfully!')
    resp.status_code = 200
    return resp


# not found
@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
