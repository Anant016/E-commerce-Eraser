const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
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
  }
});

module.exports = Address = mongoose.model("addresss", AddressSchema);
