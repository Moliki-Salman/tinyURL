const request = require("supertest")
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const app = require("../app")
const userModel = require("../models/user-model")

let database;

//connect to the MongoDB local host before any test

beforeAll(async () => {
  const connectToDataBase  = process.env.MONGO_DB_LOCAL_HOST;
  await mongoose.connect(connectToDataBase, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  database = mongoose.connection;
});

// Close the MongoDB connection after all tests
afterAll(async () => {
  await mongoose.disconnect();
});

describe("signup", () => {
  test("should create a new user and return a token with status code 201", async () => {
    const newUser = {
      firstname: "userFirstName",
      lastname: "userLastName",
      email: "newuser@gmail.com",
      password: "newuserpassword"
    };

    // Send a request to signup with the user data
    const response = await request(app).post('/signup').send(newUser);

    // Assert that the response contains the expected information and status code 201
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('message', 'successful');
    expect(response.body).toHaveProperty('user.email', newUser.email);
    expect(response.body).toHaveProperty('user.firstname', newUser.firstname);
    expect(response.body).toHaveProperty('user.lastname', newUser.lastname);
    expect(response.body.user).toHaveProperty('token');

  })
})



