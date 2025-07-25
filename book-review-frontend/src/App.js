import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import BooksList from "./pages/BooksList";
import AddReview from "./pages/AddReview";
import BookReviews from "./pages/BookReviews";
import Dashboard from "./pages/Dashboard"; 

const App = () => {
  return (
    <Router>
      <Routes> {}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {}
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/books" element={<BooksList />} />
        <Route path="/books/:bookId" element={<BookReviews />} />
        <Route path="/reviews/:bookId" element={<AddReview />} />
      </Routes>
    </Router>
  );
};

export default App;
