const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config()

const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "valid token required" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user= decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
module.exports =  authenticateUser 