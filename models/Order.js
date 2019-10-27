const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  items: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  landmark: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
  // name: {
  //   type: String,
  //   required: true
  // },
  // price: {
  //   type: String,
  //   required: true
  // },
  // desc: {
  //   type: String,
  //   required: true
  // },
  // qty: {
  //   type: String,
  //   required: true
  // },
  // number: {
  //   type: String,
  //   required: true
  // },
  // image: {
  //   type: String,
  //   required: true
  // }
});

module.exports = Order = mongoose.model("orders", OrderSchema);
