const UserController = require("../../controllers/user-controller");
const User = require("../../models/user-model");
const { MongoClient } = require("mongodb");

describe("UserController", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("signup", () => {
    it("does not create a user if it already exists", async () => {
      const users = db.collection("users");

      const mockUser = { email: 'name@email.com' }
      await users.insertOne(mockUser)

      const req = {
        body: {
          firstname: "name",
          lastname: "last",
          email: "name@email.com",
          password: "pass",
        },
      };
    });
  });
});
