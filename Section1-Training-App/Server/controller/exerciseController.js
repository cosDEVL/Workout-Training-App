const catchAsync = require("../utils/catchAsync");
const Exercise = require("../model/exerciseSchema");
const AppError = require("../middleware/AppError");

exports.exerciseList = catchAsync(async (req, res) => {
  const { query } = req;
  const filter = {};

  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }
  if (query.bodyParts) filter.bodyParts = { $in: query.bodyParts.split(",") };
  if (query.equipments)
    filter.equipments = { $in: query.equipments.split(",") };
  if (query.exerciseType)
    filter.exerciseType = { $in: query.exerciseType.split(",") };

  const data = await Exercise.find({ ...filter, isActive: true });

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    results: data.length,
    message: "Data fetched successfully",
    data: data,
  });
});

exports.addNewExercise = catchAsync(async (req, res) => {
  await Exercise.create(req.body);

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Data created successfully",
    data: req.body,
  });
});

exports.exerciseDetails = catchAsync(async (req, res) => {
  const data = await Exercise.find({ exerciseId: req.params.id });

  if (data.length === 0) throw new AppError(404, "Exercise not found");

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Data fetched successfully",
    data,
  });
});

exports.updateExercise = catchAsync(async (req, res) => {
  await Exercise.findOneAndUpdate({ exerciseId: req.params.id }, req.body);

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Data updated successfully",
  });
});

exports.deleteExercise = catchAsync(async (req, res) => {
  await Exercise.findOneAndUpdate(
    { exerciseId: req.params.id },
    { isActive: false },
  );

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Data deleted successfully",
  });
});
