import user from "../models/usermodel.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  const { name, email, password, mobile } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = new user({
      name,
      email,
      password: hashedpassword,
      mobile,
    });
    await newUser.save();
    res.status(200).json({ message: "user added" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isUser = await user.findOne({ email: email });
    if (isUser) {
      const verifyPassword = await bcrypt.compare(password, isUser.password);
      if (verifyPassword) {
        const user = {
          _id: isUser._id,
          email: isUser.email,
        };
        const { password, ...others } = isUser._doc;
        const token = jwt.sign(user, "foodie", { expiresIn: "30d" });
        res.status(200).json({ ...others, token });
      } else {
        next(errorHandler(400, "Incorrect username/password"));
      }
    } else {
      next(errorHandler(400, "user not found"));
    }
  } catch (error) {
    next(error);
  }
};

export const oauth = async (req, res, next) => {
  try {
    const isUser = await user.findOne({ email: req.body.email });
    if (isUser) {
      const user = {
        _id: isUser._id,
        email: isUser.email,
      };
      const token = jwt.sign(user, process.env.JWT_SCT, { expiresIn: "30d" });
      const { password, ...others } = isUser._doc;
      res.status(200).json({ ...others, token });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(generatedPassword, salt);
      const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: hashedpassword,
      });
      await newUser.save();
      const userData = {
        _id: newUser._id,
        email: newUser.email,
      };
      const token = jwt.sign(userData, process.env.JWT_SCT, {
        expiresIn: "30d",
      });
      const { password, ...others } = newUser._doc;
      res.status(200).json({ ...others, token });
    }
  } catch (error) {
    next(error);
  }
};
