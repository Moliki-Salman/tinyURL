const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
const bcrypt = require("bcrypt");


const SECRET_KEY = "ABCDEFG";

const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    };
    // const hashedPassword = await bcrypt.hash(password, 10);
    bcrypt.hash(password, 10, async function(err, hashedPassword) {
      if (err) {
        throw new Error("error", { cause: err });
      };
      // Store hash in your password DB.
      const result = await UserModel.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      });
      const token = jwt.sign(
        { email: result.email, id: result._id },
        SECRET_KEY
      );
      res.status(201).json({ user: result, token: token });
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "something went wrong", error: JSON.stringify(error) });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User  not found" });
    };

    bcrypt.compare(
      password,
      existingUser.password,
      function (err, matchedpassword) {
        if (!matchedpassword) {
          return res.status(400).json({ mesaage: "Invalid credentials" });
        }
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          SECRET_KEY
        );
        res.status(201).json({ user: existingUser, token: token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", error: JSON.stringify(error) });
  }
};

module.exports = { signup, login };