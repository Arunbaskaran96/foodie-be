import mongoose from "mongoose";

const cartmodel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: true,
  },
  name: {
    type: String,
  },
  cartItem: [
    {
      dishName: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      dishId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
});

const cartModel = mongoose.model("carts", cartmodel);
export default cartModel;
