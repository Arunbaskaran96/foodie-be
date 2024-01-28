import cartModel from "../models/cart.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const addToCart = async (req, res, next) => {
  try {
    const user = await cartModel.findOne({ userId: req.user._id });
    if (!user) {
      const newData = new cartModel({
        userId: req.user._id,
        restaurantId: req.body.restaurantId,
        cartItem: {
          dishName: req.body.dishName,
          price: req.body.price,
          dishId: req.body.dishId,
        },
      });
      await newData.save();
      res.status(200).json({ message: "added to cart" });
    } else {
      const hotel = user.restaurantId == req.body.restaurantId;
      if (hotel) {
        await user.updateOne({
          $push: {
            cartItem: {
              dishName: req.body.dishName,
              price: req.body.price,
            },
          },
        });
        res.status(200).json({ message: "Added to the existing one" });
      } else {
        next(
          errorHandler(400, "Your cart contains items from other restaurant")
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await cartModel
      .findOne({ userId: req.user._id })
      .populate("restaurantId");
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    next(error);
  }
};

export const removeCart = async (req, res, next) => {
  try {
    const user = await cartModel.findOne({ userId: req.user._id });
    if (user) {
      await user.updateOne({
        $pull: {
          cartItem: {
            _id: req.params.id,
          },
        },
      });
      res.status(200).json({ message: "removed from cart" });
    } else {
      next(errorHandler(400, "removed already"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    await cartModel.deleteOne({ userId: req.user._id });
    res.status(200).json({ message: "Ordered Successfully" });
  } catch (error) {
    next(error);
  }
};
