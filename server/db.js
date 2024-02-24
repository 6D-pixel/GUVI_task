const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected!"));

const userSchema = mongoose.Schema({
  Name: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  dob: { type: Date, default: Date.now },
  mobile: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
