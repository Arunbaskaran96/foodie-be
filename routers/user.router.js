import express from "express";
import { editUser, addToOrder } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
const router = express.Router();

router.put("/addtoorders", verifyUser, addToOrder);
router.put("/edituser", verifyUser, editUser);

export default router;
