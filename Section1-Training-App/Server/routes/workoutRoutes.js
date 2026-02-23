const express = require("express");
const router = express.Router();

const {
  workoutList,
  addNewWorkout,
  deleteAllWorkouts,
  workoutDetails,
  updateWorkout,
  deleteWorkout,
} = require("../controller/workoutController");

router
  .route("/")
  .get(workoutList)
  .post(addNewWorkout)
  .delete(deleteAllWorkouts);
router
  .route("/:id")
  .get(workoutDetails)
  .patch(updateWorkout)
  .delete(deleteWorkout);

module.exports = router;
