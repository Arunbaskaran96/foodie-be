import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorHandler } from "./errorHandler.js";
dotenv.config();

export const verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const verify = jwt.verify(token, "foodie", (err, user) => {
      if (err) next(errorHandler(400, "Auth verify failed"));
      req.user = user;
      next();
    });
  } else {
    next(errorHandler(400, "Auth required"));
  }
};
