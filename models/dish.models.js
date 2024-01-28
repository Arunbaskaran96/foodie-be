import mongoose from "mongoose";
const dishModel = new mongoose.Schema({
  resturant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
  },
  dishName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  isOffer: {
    type: Boolean,
  },
  offer: {
    type: String,
  },
  variant: {
    type: String,
  },
  img: {
    type: String,
    default:
      "https://png.pngtree.com/element_our/20200702/ourmid/pngtree-vector-illustration-knife-and-fork-western-food-plate-image_2283844.jpg",
  },
});

const dishmodel = mongoose.model("dishes", dishModel);
export default dishmodel;
