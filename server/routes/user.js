const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

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
  const user = await User.create({
    Name: req.body.Name,
    email: req.body.email,
    password: req.body.password,
  });

  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.status(200).json({ token: token, msg: "created new user successfully " });
});

//login
const loginBody = zod.object({
  email: zod.string().email(),
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
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    return res.status(200).json({ msg: "success", token: token });
  }
  return res.status(411).json({ msg: "Error while logging in" });
});

//update
const updateBody = zod.object({
  age: zod.number().optional(),
  gender: zod.string().optional(),
  dob: zod.string().optional(),
  mobile: zod.string().optional(),
});
router.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: "invalid input" });
  }
  await User.updateOne(
    { _id: req.userId },
    { $set: req.body.profileData }
  );
  res.status(200).json({ msg: "Updated Successfully" });
});

router.get("/userData",authMiddleware,async (req,res)=>{
  const user =await User.findOne({
    _id : req.userId
  }).select('age gender dob mobile')
  res.status(200).json(user)
})

module.exports = router;
