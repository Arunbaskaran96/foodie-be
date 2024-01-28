import express from "express";
const router = express.Router();
import {
  addDish,
  getDishes,
  getRestaurant,
} from "../controllers/dish.controller.js";

router.post("/addDish", addDish);
router.get("/search", getDishes);
router.get("/getRestaurant/:id", getRestaurant);

export default router;
