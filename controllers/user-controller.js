const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");


// const signup = async (req, res) => {
//   const { firstname, lastname, email, password } = req.body;
//   try {
//     const existingUser = await UserModel.findOne({ email: email });
//     if (existingUser) {
//       return res.status(400).json({ message: "user already exist" });
//     }
//     bcrypt.hash(password, 10, async function (err, hashedPassword) {
//       if (err) {
//         throw new Error("error", { cause: err });
//       }
//       // Store hash in your password DB.
//       const user = await UserModel.create({
//         firstname: firstname,
//         lastname: lastname,
//         email: email,
//         password: hashedPassword,
//       });

//       function signInToken() {
//         const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
//         res.status(201).json({
//           message: "successful",
//           user: { email, firstname, lastname, token },
//         });
//       }
//       signInToken();
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Internal Server error", error: JSON.stringify(error) });
//   }
// };


const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    // Use async version of bcrypt.hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store hash in your password DB and create the user
    const user = await UserModel.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    // Generate and sign the token
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);

    // Respond with the token and user information
    res.status(201).json({
      message: "successful",
      user: { email, firstname, lastname, token },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: JSON.stringify(error) });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User  does not exist" });
    }

    bcrypt.compare(
      password,
      existingUser.password,
      function (err, matchedpassword) {
        if (!matchedpassword) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        function signInToken() {
          const token = jwt.sign(
            { email: existingUser.email },
            process.env.SECRET_KEY
          );
          res.status(201).json({
            message: "successful",
            existingUser: { email, token },
          });
        }
        signInToken();
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server error", error: JSON.stringify(error) });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: JSON.stringify(error) });
  }
};

module.exports = { signup, login, deleteUser };
