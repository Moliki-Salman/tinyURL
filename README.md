
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
Install node from the website and download node for your device type:
```bash
$  https://nodejs.org/en
```
Install MongoDB  for your operating system from the website: 
```bash
$  https://www.mongodb.com/docs/manual/installation/
```
Clone this repository and run locally
```bash
git clone https://github.com/Moliki-Salman/tinyURL.git
```
Run this code to get started
```bash
 npm install
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
2. connect to the API using postman on port 3000
