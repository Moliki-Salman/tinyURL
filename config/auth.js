// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "valid token required" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Cause of the ERROR:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

