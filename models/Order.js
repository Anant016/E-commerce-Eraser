const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  product_name: {
    type: String,
    required: true
  },
  product_price: {
    type: String,
    required: true
  },
  product_desc: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

module.exports = Order = mongoose.model("orders", OrderSchema);
