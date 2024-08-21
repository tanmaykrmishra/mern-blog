import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./utils/error.js";

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
