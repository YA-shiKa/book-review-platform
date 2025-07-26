import React, { useState } from "react";
import axios from "axios"; // Importing axios
import { useParams, useNavigate } from "react-router-dom"; 
import { FaStar } from "react-icons/fa"; 

const AddReview = () => {
  const { bookId } = useParams(); 
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    review_text: "",
    rating: 0, 
  });

  // Function to handle change in the rating
  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8000/api/reviews/create/${bookId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Review added successfully!");
      setFormData({ review_text: "", rating: 0 });
      navigate(`/books/${bookId}`); 
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  // Generate 5 stars
  const generateStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= formData.rating;
      const halfFilled = i - 0.5 === formData.rating;
      stars.push(
        <FaStar
          key={i}
          size={30}
          className={`cursor-pointer ${filled ? "text-yellow-400" : halfFilled ? "text-yellow-300" : "text-gray-300"}`}
          onClick={() => handleRatingChange(i)} 
          onMouseEnter={() => handleRatingChange(i)} 
          onMouseLeave={() => handleRatingChange(formData.rating)} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Add Review</h2>
        <textarea
          name="review_text"
          placeholder="Your review..."
          value={formData.review_text}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        
        {/* Star rating display and selection */}
        <div className="flex mb-4">
          {generateStars()}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 w-full rounded hover:bg-blue-600"
        >
          Add Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;


