const jwt = require("jsonwebtoken");
const SECRET_KEY = "ABCDEFG";

const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(402).json("valid token required");
  }
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    console.log(decodedToken);
    req.user= decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};

(module.exports =  authenticateUser )
