const asyncHandler = require("express-async-handler");
const Book = require("../model/Book");
const Review = require("../model/Review");

const bookController = {
  // Create a new book
  create: asyncHandler(async (req, res) => {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
      throw new Error("All fields (title, author, genre) are required");
    }

    const book = await Book.create({
      title,
      author,
      genre,
    });

    res.status(201).json(book);
  }),

  // pagination, filters, and sorting added
  list: asyncHandler(async (req, res) => {
    const { author, genre, page = 1, limit = 9 } = req.query;
    const filters = {};

    // filters for author and genre 
    if (author) filters.author = new RegExp(author, "i");
    if (genre) filters.genre = new RegExp(genre, "i");

    try {
      // Fetch books 
      const books = await Book.find(filters)
        .skip((page - 1) * limit) 
        .limit(Number(limit)) 
        .sort({ createdAt: -1 }); 
      // total number of books matching filters
      const totalBooks = await Book.countDocuments(filters);
      const totalPages = Math.ceil(totalBooks / limit); 

      // Send the response 
      res.status(200).json({
        books,
        totalPages,
        currentPage: Number(page), 
        totalBooks,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching books", error: error.message });
    }
  }),

  // Get single book with reviews
  getById: asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).lean();
    if (!book) throw new Error("Book not found");

    const reviews = await Review.find({ book: req.params.id }).populate("reviewer", "username");

    const averageRating =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1);

    res.json({ ...book, reviews, averageRating: averageRating.toFixed(1) });
  }),
};

module.exports = bookController;
