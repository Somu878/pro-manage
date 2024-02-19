const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
  },
  password: {
    type: String,
    required: [true, "Password is a required field"],
  },
});

module.exports = mongoose.model("User", userSchema, "userData");
