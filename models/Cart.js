//Final Cart.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  product_name: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  product_desc: {
    type: Number,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

module.exports = Cart = mongoose.model("carts", CartSchema);
