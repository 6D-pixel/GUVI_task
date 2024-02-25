const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Connected!"));

const userSchema = new mongoose.Schema({
  Name: String,
  email: String,
  password: String,
  age: { type: Number, default: 0 },
  gender: { type: String, default: "" },
  dob: { type: String, default: () => new Date().toISOString().split('T')[0] },
  mobile: { type: String, default: "" }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
