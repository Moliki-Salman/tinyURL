const jwt = require("jsonwebtoken");
const SECRET_KEY = "ABCDEFG";

 const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(402).jscon("valid token required")
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.authUserData = decoded;
  } catch (error) {
    res.status(400).jscon({
      message: "Authentication failed",
    });
  }
  return next()
};

module.exports = authenticateToken
 
  
 