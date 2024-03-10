// Import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectDB from "./config/db.js";
import AuthRouter from "./routes/auth.routes.js";
import passport from "passport";

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

connectDB();
// Middleware for CORS
app.use(cors());
// Use cookie-parser middleware
app.use(cookieParser());

// Middleware for parsing JSON bodies
app.use(express.json());

// Homepage route
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// API route for authentication
app.use("/api/auth", AuthRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
