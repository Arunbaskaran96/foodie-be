import restaurants from "../models/restaurant.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const addRestaurant = async (req, res, next) => {
  try {
    const newRest = new restaurants({
      name: req.body.name,
      address: req.body.address,
      img: req.body.img,
    });
    await newRest.save();
    res.status(200).json({ message: "new restaurant added" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getRestaurants = async (req, res, next) => {
  try {
    const items = await restaurants.find();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};
