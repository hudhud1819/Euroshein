
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

// API health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Euroshein API is running!",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Protected administrator routes
app.use("/api/admin", adminRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

// General error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({
    message: "An unexpected server error occurred.",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Euroshein API running on port ${PORT}`);
});
