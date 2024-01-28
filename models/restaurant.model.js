import mongoose from "mongoose";

const restaurantsModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const restaurants = mongoose.model("restaurants", restaurantsModel);

export default restaurants;
