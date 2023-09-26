const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    bcrypt.hash(password, 10, async function (err, hashedPassword) {
      if (err) { throw new Error("error", { cause: err }) }
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
    });
  } catch (error) {
    res.status(500)
      .json({
          message: "Internal Server error", 
          error: JSON.stringify(error) 
      });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User  does not exist" });
    }

    bcrypt.compare(password, user.password, function (err, matchedpassword) {
      if (!matchedpassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
      res.status(201).json({
        message: "successful",
        user: { email, token },
      });
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      error: JSON.stringify(error),
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne({ email });
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: JSON.stringify(error) });
  }
};

module.exports = { signup, login, deleteUser };
