const catchAsync = require("../utils/catchAsync");
const Workout = require("../model/workoutSchema");
const AppError = require("../middleware/AppError");

async function getWorkoutAndPopulate(filterObj = {}) {
  return await Workout.find(filterObj).populate("exerciseList.exerciseRef", [
    "exerciseId",
    "name",
    "bodyParts",
    "imageUrl",
  ]);
}

exports.workoutList = catchAsync(async (req, res) => {
  const workouts = await getWorkoutAndPopulate();

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "All workouts fetched successfully",
    data: workouts,
  });
});

exports.workoutDetails = catchAsync(async (req, res) => {
  const workout = await getWorkoutAndPopulate({ _id: req.params.id });

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Workout fetched successfully",
    data: workout,
  });
});

exports.addNewWorkout = catchAsync(async (req, res) => {
  const newWorkout = await Workout.create(req.body);

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Workout created successfully",
    data: newWorkout,
  });
});

exports.deleteAllWorkouts = catchAsync(async (req, res) => {
  await Workout.deleteMany();

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "All workouts deleted successfully",
  });
});

exports.deleteWorkout = catchAsync(async (req, res) => {
  await Workout.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Workout deleted successfully",
  });
});

exports.updateWorkout = catchAsync(async (req, res, next) => {
  const workoutUpdated = await Workout.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      returnDocument: "after",
    },
  ).populate("exerciseList.exerciseRef");

  if (!workoutUpdated)
    return next(new AppError(404, "No workout available with that ID"));

  res.status(200).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Workout updated successfully",
    data: workoutUpdated,
  });
});
