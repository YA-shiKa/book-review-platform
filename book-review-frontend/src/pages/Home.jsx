import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('https://miro.medium.com/v2/resize:fit:1100/format:webp/1*TErHODvkJTDfdOJyLNrjcw.jpeg')", // Replace with your background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg text-center"
        style={{ maxWidth: "90%", margin: "0 auto" }}
      >
        <h1 className="text-4xl font-bold mb-4 text-white">Welcome to the Book Review Platform</h1>
        <p className="text-lg text-white mb-6">
          Discover new books, share your thoughts, and connect with other readers. Whether you're looking to find your next favorite book or leave feedback on a recent read, our platform is here to help!
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
