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
const { fortKnoxBouncer } = require("../middleware/protect");

router
  .route("/")
  .get(fortKnoxBouncer, workoutList)
  .post(fortKnoxBouncer, addNewWorkout)
  .delete(fortKnoxBouncer, deleteAllWorkouts);
router
  .route("/:id")
  .get(fortKnoxBouncer, workoutDetails)
  .patch(fortKnoxBouncer, updateWorkout)
  .delete(fortKnoxBouncer, deleteWorkout);

module.exports = router;
