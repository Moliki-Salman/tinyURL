<<<<<<< HEAD
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// const userModel = require("../models/user-model");
import userModel from "../models/user-model.js";
import bcrypt  from "bcrypt";
// const bcrypt = require("bcrypt");
=======
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
>>>>>>> 3e3bacd1390ff48e411b23278b87395776680146

export const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
<<<<<<< HEAD
    bcrypt.hash(password, 10, async function (err, hashedPassword) {
      if (err) {
        throw new Error("error", { cause: err });
      }
      const user = await userModel.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      });
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
      res.status(201).json({
        message: "successful",
        user: { email, firstname, lastname, token },
      });
=======

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);

    res.status(201).json({
      message: "successful",
      user: { email, firstname, lastname, token }
>>>>>>> 3e3bacd1390ff48e411b23278b87395776680146
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
<<<<<<< HEAD
      error: JSON.stringify(error),
=======
      error: error,
>>>>>>> 3e3bacd1390ff48e411b23278b87395776680146
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User  does not exist" });
    }

<<<<<<< HEAD
    bcrypt.compare(password, user.password, function (err, matchedpassword) {
      if (!matchedpassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
      res.status(201).json({
        message: "successful",
        user: { email, token },
      });
=======
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
    res.status(201).json({
      message: "successful",
      user: { email, token },
>>>>>>> 3e3bacd1390ff48e411b23278b87395776680146
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error: JSON.stringify(error),
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User  does not exist" });
    }
    await user.deleteOne({ email });
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: JSON.stringify(error) });
  }
};

// module.exports = { signup, login, deleteUser };
