const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");

//signup
const signupBody = zod.object({
  Name: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: "invalid input" });
  }
  const existingUser = await User.findOne({
    email: req.body.email,
  });
  if (existingUser) {
    return res.status(411).json({ msg: "user already exist" });
  }
  //create user
  await User.create({
    Name: req.body.Name,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json({ msg: "created new user successfully " });
});

//login
const loginBody = zod.object({
  emil: zod.string().email(),
  password: zod.string(),
});
router.post("/login", async (req, res) => {
  const { success } = loginBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: "Invalid Input" });
  }
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.status(200).json({ msg: "success" });
  }
  return res.status(411).json({ msg: "Error while logging in" });
});

//update
router.post("/update", async (req, res) => {});

module.exports = router;
