import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/587536078/photo/books-on-grunge-wooden-table-desk-shelf-in-library-back.jpg?s=612x612&w=0&k=20&c=E5IGL27uEBpnGMHTVX4700dmRi322n1Ump5gHKBiL-s=')", // Replace with your chosen background image URL
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="bg-white bg-opacity-75 p-10 rounded-lg shadow-lg w-full max-w-md text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h2>

        <button
          onClick={() => handleNavigation("/add-book")}
          className="bg-blue-600 text-white py-3 px-6 rounded-md w-full hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Add Book
        </button>

        <button
          onClick={() => handleNavigation("/reviews")}
          className="bg-green-600 text-white py-3 px-6 rounded-md w-full hover:bg-green-700 transition duration-300 transform hover:scale-105"
        >
          Add Review
        </button>

        <button
          onClick={() => handleNavigation("/books")}
          className="bg-yellow-600 text-white py-3 px-6 rounded-md w-full hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
        >
          View Books & Reviews
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
