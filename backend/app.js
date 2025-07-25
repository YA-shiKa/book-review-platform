require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const bookRouter = require("./routes/bookRouter");
const reviewRouter = require("./routes/reviewRouter");

const errorHandler = require("./middlewares/errorHandlerMiddleware");

const app = express();

//! MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.error("MongoDB Connection Error:", e));

//! CORS Configuration
const corsOptions = {
  origin: ["http://localhost:3000"], // Frontend URL
};
app.use(cors(corsOptions));

//! Middleware
app.use(express.json()); // Parse incoming JSON

//! Routes
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/reviews", reviewRouter);

//! Error Handling Middleware (should be after routes)
app.use(errorHandler);

//! Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`✅ Server is running on port ${PORT}`)
);
