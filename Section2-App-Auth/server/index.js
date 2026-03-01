require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./controllers/errorController");
const connectDB = require("./config/db");
const express = require("express");
const AppError = require("./utils/AppError");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  }),
);

app.use("/api/v1/users", userRoutes);
app.all("/*\w", (req, res, next) => {
  next(new AppError(404, `Route ${req.originalUrl} not found`));
});

app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log("Server listening on port", PORT);
});
