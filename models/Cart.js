//Final Cart.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  qty: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = Cart = mongoose.model("carts", CartSchema);
