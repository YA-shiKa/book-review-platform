import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddReview = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    review_text: "",
    rating: "",
  });

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
      setFormData({ review_text: "", rating: "" });
      navigate(`/books/${bookId}`); // Redirect back to book reviews page
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
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
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
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

