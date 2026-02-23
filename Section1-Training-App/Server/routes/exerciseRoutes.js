const express = require("express");
const router = express.Router();

const {
  exerciseList,
  addNewExercise,
  exerciseDetails,
  updateExercise,
  deleteExercise,
} = require("../controller/exerciseController");

router.route("/").get(exerciseList).post(addNewExercise);
router
  .route("/:id")
  .get(exerciseDetails)
  .patch(updateExercise)
  .delete(deleteExercise);

module.exports = router;
