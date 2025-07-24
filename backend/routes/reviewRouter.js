// routes/reviewRouter.js
const express = require("express");
const reviewRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuth");
const reviewController = require("../controllers/reviewcontroller");

// Route to create a review
reviewRouter.post(
  "/create/:bookId",
  isAuthenticated,
  reviewController.create
);

// Route to list reviews for a book



reviewRouter.get(
  "/:bookId",
  reviewController.list
);

module.exports = reviewRouter;
