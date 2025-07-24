
require("dotenv").config();

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.json({
    id: newUser._id,
    email: newUser.email,
    username: newUser.username,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "30d",
});


  res.json({
    message: "Login successful",
    token,
    id: user._id,
    email: user.email,
    username: user.username,
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  if (!user) throw new Error("User not found");

  res.json({ username: user.username, email: user.email });
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
