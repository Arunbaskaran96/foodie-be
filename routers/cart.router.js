import express from "express";
import {
  addToCart,
  getCart,
  removeCart,
  deleteCart,
} from "../controllers/cart.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/addtocart", verifyUser, addToCart);
router.get("/getCart", verifyUser, getCart);
router.put("/removeCart/:id", verifyUser, removeCart);
router.delete("/deletecart", verifyUser, deleteCart);

export default router;
