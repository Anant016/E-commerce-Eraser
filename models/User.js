const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
