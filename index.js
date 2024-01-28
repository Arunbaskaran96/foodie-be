import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authrouter from "./routers/auth.router.js";
import restaurantrouter from "./routers/restaurant.router.js";
import dishrouter from "./routers/dish.router.js";
import cartrouter from "./routers/cart.router.js";

import userrouter from "./routers/user.router.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", authrouter);
app.use("/api", restaurantrouter);
app.use("/api", dishrouter);
app.use("/api", cartrouter);
app.use("/api", userrouter);

app.use((error, req, res, next) => {
  const statuscode = error.statuscode || 500;
  const message = error.message || "Internal server error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

app.listen(8000, () => {
  console.log("server connected");
});
