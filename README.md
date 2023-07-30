
# tinyURL

tinyURL is an API that allows a person to create a shortened URL.

The project is written with Javascript using express Node.js application framework and MongoDB as the database.
## Features

1. User can signup and login to their account. 

2. User account activated using JSON web token authenitcation. 

3. User password is encrypted for security.

4. only Authorized users can create, read and delete tiny urls. 

5. Authorized users can deactive or delete their account  with JSON web token authenitcation. 


## Getting started

Clone this repository and run locally
```bash
git clone https://github.com/Moliki-Salman/tinyURL.git
```


Install mongoDB database locally or connect with mongoDB Atlas database.

Run npm install to install all dependencies.

## Dependencies
 

All dependencies  for the project can be installed by running: 

1. Set up a new npm package.
```bash
$ npm init
```
2. Install express as the web framework.
```bash
$ npm install express
```
3. Install mongoose as the object modeling tool.
```bash
$ npm install mongoose
```
4. Install Body-Parser to handle incoming request  body in a middleware bofore handlers.
```bash
$ npm install body-parser
```
5. Install shortid to create  url-friendly short unique ids.
```bash
$ npm install shortid
```
6. Install valid-url for URL validation.
```bash
$ npm install valid-url
```
7. Install JSON web token to handle authentication and authorization.
```bash
$ npm install jsonwebtoken
```
8. Install bcrypt for password security.
```bash
$ npm install bcrypt
```
9. Install mocha as the web framework.
```bash
$ npm install mocha
```
10. Install chai as an assertion library
```bash
$ npm install chai
```
11. Install chai-HTTP for proper interface testing.
```bash
$ npm install chai-HTTP
```
12. Install nodemon for monitoring changes and automatically restarting application
```bash
$ npm install nodemon
```
13. Install  dotenv to store environmental variables 
```bash
$ npm install dotenv 
```


## Running the App

1. start the application by running:
```bash
$ nodemon app.js 
```
2. connect the API using postman on port 3000

## Testing 
 
To test this project API, run locally

```bash
$ npm run test
```


## API Endpoints



```http
POST http://localhost:3000/user/signup | To sign up a new user account 
```
```http
POST http://localhost:3000/user/login | To login an existing user account 
```
```http
DELETE http://localhost:3000/user/delete | To login an existing user account 
```
```http
POST http://localhost:3000/signup | To create a tiny url
```
```http
GET http://localhost:3000 | To get all urls created by a user
```
```http
GET http://localhost:3000/:code | To get a url by urlcode
```
```http
DELETE http://localhost:3000/:code | To delete a url by urlcode
```
