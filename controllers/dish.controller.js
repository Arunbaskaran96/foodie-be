import dishmodel from "../models/dish.models.js";

export const addDish = async (req, res, next) => {
  try {
    const { dishName, price, img, offer, isOffer, type, variant, resturant } =
      req.body;
    const newDish = new dishmodel({
      dishName,
      price,
      img,
      offer,
      isOffer,
      type,
      variant,
      resturant,
    });
    await newDish.save();
    res.status(200).json({ message: "new dish added" });
  } catch (error) {
    next(error);
  }
};

export const getDishes = async (req, res, next) => {
  let type = req.query.type || undefined;
  let dishName = req.query.dishName || "";

  if (type === undefined) {
    type = { $in: ["veg", "nonveg"] };
  }

  try {
    const items = await dishmodel
      .find({
        dishName: { $regex: dishName, $options: "i" },
        type,
      })
      .populate("resturant");
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const getRestaurant = async (req, res, next) => {
  try {
    const dishes = await dishmodel
      .find({ resturant: req.params.id })
      .populate("resturant");
    res.status(200).json(dishes);
  } catch (error) {
    next(error);
  }
};
