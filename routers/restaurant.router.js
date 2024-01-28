import express from "express";
import {
  addRestaurant,
  getRestaurants,
} from "../controllers/restaurant.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/addRestaurant", addRestaurant);
router.get("/getRestaurants", getRestaurants);

export default router;
