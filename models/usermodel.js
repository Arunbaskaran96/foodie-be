import mongoose from "mongoose";

const usermodel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    unique: true,
  },
  address: {
    type: String,
  },
  orders: [
    {
      resturant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants",
      },
      name: {
        type: String,
      },
      dishName: {
        type: String,
      },
      dishId: {
        type: String,
      },
      price: {
        type: String,
      },
      img: {
        type: String,
        default:
          "https://png.pngtree.com/element_our/20200702/ourmid/pngtree-vector-illustration-knife-and-fork-western-food-plate-image_2283844.jpg",
      },
    },
  ],
});

const user = mongoose.model("users", usermodel);
export default user;
