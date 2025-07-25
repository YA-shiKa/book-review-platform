import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookReviews = () => {
  const { bookId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/reviews/${bookId}`);
        setReviews(data);
        const avg = data.reduce((acc, curr) => acc + curr.rating, 0) / (data.length || 1);
        setAverageRating(avg.toFixed(1));
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [bookId]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl mb-4">Reviews</h2>
      <p className="mb-4">Average Rating: {averageRating}</p>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded shadow-md">
            <p>{review.review_text}</p>
            <p>Rating: {review.rating}</p>
            <p>By: {review.reviewer.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReviews;
