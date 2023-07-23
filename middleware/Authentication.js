const jwt = require("jsonwebtoken");
const SECRET_KEY = "ABCDEFG";

const authenticateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(402).json("valid token required");
  }
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    console.log(decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};

function checkUserRole(role) {
  return (req, res, next) => {
    if (req.user.role !== "admin") {
      res
        .status(401)
        .json({ message: "this route os restricted to only admin users" });
    }
    next();
  };
}

(module.exports = authenticateToken), checkUserRole;
