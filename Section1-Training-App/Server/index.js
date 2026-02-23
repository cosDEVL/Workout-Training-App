require("dotenv").config();

const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const errorHandler = require("./controller/errorController");

const express = require("express");
const cors = require("cors");
const AppError = require("./middleware/AppError");
const connectDB = require("./config/db");
const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/v1/workouts", workoutRoutes);
app.use("/api/v1/exercises", exerciseRoutes);
app.all("/*\w", (req, res, next) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is listening on port", PORT);
});
