const catchAsync = require("../utils/catchAsync");
const Workout = require("../model/workoutSchema");

exports.workoutList = catchAsync(async (req, res) => {
  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
});

exports.addNewWorkout = catchAsync(async (req, res) => {
  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
});

exports.deleteAllWorkouts = catchAsync(async (req, res) => {
  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
});

exports.workoutDetails = catchAsync(async (req, res) => {
  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
});

exports.updateWorkout = catchAsync(async (req, res) => {
  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
});

exports.deleteWorkout = catchAsync(async (req, res) => {
  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
});
