const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/v1/workouts", workoutRoutes);
app.use("/api/v1/exercises", exerciseRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
