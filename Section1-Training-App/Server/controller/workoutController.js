const catchAsync = require("../utils/catchAsync");
const Workout = require("../model/workoutSchema");
const AppError = require("../utils/AppError");

async function getWorkoutAndPopulate(req, filterObj = {}) {
  const userID = req.user.id;

  return await Workout.find({ userID, ...filterObj }).populate(
    "exerciseList.exerciseRef",
    ["exerciseId", "name", "bodyParts", "imageUrl"],
  );
}

exports.workoutList = catchAsync(async (req, res, next) => {
  const workouts = await getWorkoutAndPopulate(req);

  if (workouts.length === 0)
    return next(new AppError(404, "No workouts found"));

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "All workouts fetched successfully",
    results: workouts.length,
    data: workouts,
  });
});

exports.workoutDetails = catchAsync(async (req, res, next) => {
  const workout = await getWorkoutAndPopulate(req, { _id: req.params.id });

  if (workout.length === 0)
    return next(new AppError(404, "Requested workout not available"));

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Workout fetched successfully",
    data: workout[0],
  });
});

exports.addNewWorkout = catchAsync(async (req, res) => {
  const userID = req.user.id;
  const { workoutName, exerciseList } = req.body;

  const newWorkout = await Workout.create({
    userID,
    workoutName,
    exerciseList,
  });

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Workout created successfully",
    data: newWorkout,
  });
});

exports.deleteAllWorkouts = catchAsync(async (req, res) => {
  const userID = req.user.id;

  await Workout.deleteMany({ userID });

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "All workouts deleted successfully",
  });
});

exports.deleteWorkout = catchAsync(async (req, res) => {
  const userID = req.user.id;

  await Workout.findOneAndDelete({ userID, _id: req.params.id });

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Workout deleted successfully",
  });
});

exports.updateWorkout = catchAsync(async (req, res, next) => {
  const userID = req.user.id;

  const { workoutName, exerciseList } = req.body;

  const workoutUpdated = await Workout.findOneAndUpdate(
    { userID, _id: req.params.id },
    {
      workoutName,
      exerciseList,
    },
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
