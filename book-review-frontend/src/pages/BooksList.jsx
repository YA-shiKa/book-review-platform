import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ author: "", genre: "" });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/books", {
          params: filters,  // Send filters as query parameters
        });
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, [filters]); // Re-fetch when filters change

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center mt-8 mb-4">
        <input
          type="text"
          name="author"
          placeholder="Filter by Author"
          onChange={handleFilterChange}
          value={filters.author}
          className="p-2 border rounded mr-4"
        />
        <input
          type="text"
          name="genre"
          placeholder="Filter by Genre"
          onChange={handleFilterChange}
          value={filters.genre}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <Link
              to={`/books/${book._id}`}
              className="text-blue-500 mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
