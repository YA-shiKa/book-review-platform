const express = require("express");
const bookController = require("../controllers/bookcontroller");

const bookRouter = express.Router();

// Create a new book
bookRouter.post("/", bookController.create);

// Get all books with optional filters (author and genre)
bookRouter.get("/", bookController.list);

// Get details of a specific book with reviews
bookRouter.get("/:id", bookController.getById);

module.exports = bookRouter;

