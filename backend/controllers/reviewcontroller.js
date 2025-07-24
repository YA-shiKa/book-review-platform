const asyncHandler = require("express-async-handler");
const Review = require("../model/Review");
const Book = require("../model/Book");

const reviewController = {
  // Add a review to a book
  create: asyncHandler(async (req, res) => {
    const { review_text, rating } = req.body;
    const { bookId } = req.params;

    if (!review_text || !rating) {
      throw new Error("Review text and rating are required");
    }

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }

    const review = await Review.create({
      book: bookId,
      reviewer: req.user,
      review_text,
      rating,
    });

    res.status(201).json(review);
  }),

  // Get all reviews for a book
  list: asyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const reviews = await Review.find({ book: bookId }).populate("reviewer", "username");

    res.status(200).json(reviews);
  }),
};

module.exports = reviewController;
