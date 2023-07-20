const userModel = require("../model/userModel");
const bcrypt = require("bcrypt")
pasword = "349550"

exports.roleAuthorization = async (req, res) => {
  try {
    // check if there is an admin account
    userModel.findOne({ role: "admin" }, async (err, admin) => {
      if (err) {
        throw new Error("error", { cause: err });
      }
      if (admin) {
        return res.status(400).json({ message: "admin account already exist" });
      }
      bcrypt.hash(password, 10, async function (err, hashedPassword) {
        if (err) {
          throw new Error("error", { cause: err });
        }
        userModel.create({
          firstname: "Dammy",
          lastname: 'salman',
          email: "salmm@getMax.com",
          role: "admin",
          password: hashedPassword,
        });
        return res.status(200).json({ message: "admin account created" });
      });
    });
  } catch (error) {}
};
