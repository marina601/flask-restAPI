# flask-restAPI

- You can view the deployed site [here](https://blog-post-rest-api.herokuapp.com/)

- This is a blog post app using Flask to build a RestAPI CRUD operation
- MongoDB is used to store the data in the database
- Vanilla JavaScript is used to consume api and retrive data on the client side

- A user is able to create a post, update a post, edit a post, delete a post and view all the posts in the database 

- API endpoints: 

### GET
- https://blog-post-rest-api.herokuapp.com/posts - get all the data from the database
- https://blog-post-rest-api.herokuapp.com/<post_id> - retrive a single post from the database
 
### PUT

- https://blog-post-rest-api.herokuapp.com/add_post - add a post to the databasee 
### UPDATE

- https://blog-post-rest-api.herokuapp.com/update/<post_id> - update a post by id

### DELETE

- https://blog-post-rest-api.herokuapp.com/delete/<post_id> - delete a post by id

##### Api Endpoints have been tested using Postman
