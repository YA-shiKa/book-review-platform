const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/usercontroller");

const isAuthenticated = require("../middlewares/isAuth");

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected route to get user profile
userRouter.get("/profile", isAuthenticated, getUserProfile);

module.exports = userRouter;
