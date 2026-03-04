const express = require("express");
const router = express.Router();

const {
  exerciseList,
  addNewExercise,
  exerciseDetails,
  updateExercise,
  deleteExercise,
} = require("../controller/exerciseController");
const { fortKnoxBouncer } = require("../middleware/protect");

router
  .route("/")
  .get(fortKnoxBouncer, exerciseList)
  .post(fortKnoxBouncer, addNewExercise);
router
  .route("/:id")
  .get(fortKnoxBouncer, exerciseDetails)
  .patch(fortKnoxBouncer, updateExercise)
  .delete(fortKnoxBouncer, deleteExercise);

module.exports = router;
