
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

Mocha Reference: https://mochajs.org/
Chai Reference: https://www.chaijs.com/
Node Download Link: https://nodejs.org/es/
Install mongoDB database locally or connect with mongoDB Atlas database.

Run npm install to install all dependencies.

## Dependencies
 

All dependencies  for the project can be installed by running: 

1. install node from the website and download node for your device type:
```bash
$  https://nodejs.org/en
```

## Testing 
 
To test this project API, run locally

```bash
$ npm run test
```

## Running the App

1. start the application by running:
```bash
$ nodemon app.js 
```
2. connect the API using postman on port 3000


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
GET http://localhost:3000 | To get all tiny urls created by a user
```
```http
GET http://localhost:3000/:code | To get a tiny url by urlcode
```
```http
DELETE http://localhost:3000/:code | To delete a tiny url by urlcode
```
