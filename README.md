# Book Review Platform

## Overview
This is a **Book Review Platform** where users can:
- Add new books to the platform
- View a list of books with filters (by author and genre)
- Write reviews for books and rate them
- View all reviews for a book along with the average rating

This project uses **React** for the frontend and **Node.js** for the backend. It also uses **JWT** authentication to manage users.

---

## Demo Video



https://github.com/user-attachments/assets/7bfa2c9f-3dfc-43b0-9ac5-b803614ad239




---

## Setup Instructions

### Prerequisites
- **Node.js** 
- **MongoDB** 
- **NPM** 

### Steps to Run the Application

#### 1. Clone the Repository
```bash
git clone https://github.com/YA-shiKa/book-review-platform.git
```

#### 2. Install Backend Dependencies
Navigate to the backend folder and install dependencies:

```bash
cd book-review-platform/backend
npm install
```

#### 3. Set Up Environment Variables
Create a .env file in the root of the backend folder with the following environment variables:

```bash
MONGO_URL=your_mongodb_connection_url
JWT_SECRET=your_jwt_secret_key
```

#### 4. Start the Backend
To run the backend server:

```bash
npm start
```

#### 5. Install Frontend Dependencies
Navigate to the frontend folder and install dependencies:

```bash
cd book-review-platform/book-store-frontend
npm install
```

#### 6. Start the Frontend
To start the frontend server:

```bash
npm start
```
This will run the frontend on http://localhost:3000 and the backend on http://localhost:8000.

---

## Architecture Decisions
### Backend (Node.js)

The backend is built using Express.js and MongoDB. The backend provides the following functionalities:

- JWT Authentication: To ensure only authenticated users can add books and reviews.

- REST API: Exposes endpoints to add, list, and view books and reviews.

- Models:
  
  User: Stores user credentials and details.
  
  Book: Stores book information (title, author, genre).
  
  Review: Stores reviews and ratings for books.

### Frontend (React)

The frontend is built using React.js and Tailwind CSS. The UI allows users to:

- View Books: Display a list of books with filters (by genre and author).

- Add Books: Only authenticated users can add new books.

- Add Reviews: Authenticated users can write reviews and rate books.

- View Reviews: Users can view all reviews and the average rating for each book.

---
