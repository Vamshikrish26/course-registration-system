require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to read JSON data

// Routes
const courseRoutes = require("./routes/courseRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const studentRoutes = require("./routes/studentRoutes");

// API Endpoints
app.use("/courses", courseRoutes);
app.use("/registrations", registrationRoutes);
app.use("/students", studentRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("College Course Registration API is running...");
});

// Error Handling Middleware (optional but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});