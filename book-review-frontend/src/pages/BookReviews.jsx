import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa"; 
const BookReviews = () => {
  const { bookId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState({});
  const [averageRating, setAverageRating] = useState(null); 

  // Helper function to display stars based on the rating 
  const renderStars = (rating) => {
    let stars = [];
    const fullStars = Math.floor(rating); 
    const hasHalfStar = rating % 1 !== 0; 
    const emptyStars = 5 - Math.ceil(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} size={20} className="text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <FaStarHalf key="half" size={20} className="text-yellow-400" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} size={20} className="text-gray-300" />
      );
    }

    return stars;
  };

  useEffect(() => {
    const fetchBookAndReviews = async () => {
      try {
        // Fetch book details
        const { data: bookData } = await axios.get(
          `http://localhost:8000/api/books/${bookId}`
        );
        setBook(bookData);
        setAverageRating(bookData.averageRating); 

        // Fetch reviews for the book
        const { data: reviewsData } = await axios.get(
          `http://localhost:8000/api/reviews/${bookId}`
        );
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error fetching book/reviews:", err);
      }
    };

    fetchBookAndReviews();
  }, [bookId]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-3xl mb-4">{book.title}</h2>
        <p className="mb-2">Author: {book.author}</p>
        <p className="mb-2">Genre: {book.genre}</p>

        
        <h3 className="text-xl mt-4">
          Average Rating: {averageRating || "No ratings yet"}{" "}
          <div className="flex">{renderStars(averageRating || 0)}</div> 
        </h3>

        <h3 className="text-2xl mt-6">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border-b mb-4 pb-4">
              <p className="font-bold">{review.reviewer.username}</p>
              <p>{review.review_text}</p>
              <p>Rating: {review.rating}</p>
              <div className="flex mb-4">
                {renderStars(review.rating)} 
              </div>
            </div>
          ))
        )}

        <Link
          to={`/reviews/${bookId}`}
          className="bg-blue-500 text-white py-2 mt-4 inline-block rounded hover:bg-blue-600"
        >
          Add a Review
        </Link>
      </div>
    </div>
  );
};

export default BookReviews;
