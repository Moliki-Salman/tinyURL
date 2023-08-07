// const request = require('supertest');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const app = require('../app'); // Assuming your app is exported from a separate file
// const UserModel = require('../models/user-model'); // Replace with the actual path to UserModel

// let db;

// // Establish a connection to your MongoDB local host before all tests
// beforeAll(async () => {
//   const mongoUri = process.env.MONGO_DB_LOCAL_HOST;
//   await mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   db = mongoose.connection;
// });

// // Close the MongoDB connection after all tests
// afterAll(async () => {
//   await mongoose.disconnect();
// });

//  beforeEach(async () => {
//     // Delete the existing user with the specified email, if any
//     await UserModel.deleteOne({ email: 'existing@example.com' });
//   });

// describe('signup', () => {
//   test('should create a new user and return a token with status 201', async () => {
//     const userData = {
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'johndoe@example.com',
//       password: 'securepassword',
//     };

//     // Send a request to signup with the user data
//     const response = await request(app).post('/signup').send(userData);

//     // Assert that the response contains the expected data and status code 201
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty('message', 'successful');
//     expect(response.body).toHaveProperty('user.email', userData.email);
//     expect(response.body).toHaveProperty('user.firstname', userData.firstname);
//     expect(response.body).toHaveProperty('user.lastname', userData.lastname);
//     expect(response.body.user).toHaveProperty('token');

//     // Verify that the token is a valid JWT token
//     const decodedToken = jwt.verify(response.body.user.token, process.env.SECRET_KEY);
//     expect(decodedToken.email).toBe(userData.email);
//   });

//   test('should return status 400 if user already exists', async () => {
//     // Create a user with the same email in the database
//     const existingUser = {
//       firstname: 'Existing',
//       lastname: 'User',
//       email: 'existing@example.com',
//       password: 'existingpassword',
//     };
//     await UserModel.create(existingUser);

//     // Attempt to signup with the existing user's email
//     const userData = {
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'existing@example.com', // This email already exists in the database
//       password: 'securepassword',
//     };
//     const response = await request(app).post('/signup').send(userData);

//     // Assert that the response contains the expected error message and status code 400
//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({ message: 'user already exist' });
//   });
// });
