import user from "../models/usermodel.js";

import { errorHandler } from "../utils/errorHandler.js";

export const addToCart = async (req, res, next) => {
  try {
    const isUserExist = await user.findById(req.user._id);

    if (isUserExist) {
      const newItem = {
        dishName: req.body.dishName,
        price: req.body.price,
        img: req.body.img,
        resturant: req.body.resturant,
      };
      await isUserExist.updateOne({
        $push: {
          carts: newItem,
        },
      });
      res.status(200).json({ message: "Added to cart" });
    } else {
      next(errorHandler(400, "no user found"));
    }
  } catch (error) {
    next(error);
  }
};

export const addToOrder = async (req, res, next) => {
  try {
    const isUserExist = await user.findById(req.user._id);
    if (isUserExist) {
      for (let i = 0; i < req.body.length; i++) {
        const newItem = {
          dishName: req.body[i].dishName,
          price: req.body[i].price,
          img: req.body[i].img,
          resturant: req.body[i].resturant,
          name: req.body[i].name,
        };
        await isUserExist.updateOne({
          $push: {
            orders: newItem,
          },
        });
      }
      res.status(200).json({ message: "done" });
    } else {
      next(errorHandler(400, "no user found"));
    }
  } catch (error) {
    next(error);
  }
};

export const editUser = async (req, res, next) => {
  try {
    const findUser = await user.findById(req.user._id);
    if (findUser) {
      const newUser = await user.findByIdAndUpdate(
        req.user._id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(newUser);
    } else {
      next(errorHandler(400, "you can edit only your details"));
    }
  } catch (error) {
    next(error);
  }
};
