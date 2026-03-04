const catchAsync = require("../utils/catchAsync");
const Exercise = require("../model/exerciseSchema");
const AppError = require("../utils/AppError");

exports.exerciseList = catchAsync(async (req, res) => {
  const userID = req.user.id;

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

  // const data = await Exercise.find({ ...filter, isActive: true });
  const data = await Exercise.find({
    $and: [
      { ...filter, isActive: true },
      {
        $or: [
          {
            userID,
            isGlobal: false,
          },
          {
            isGlobal: true,
          },
        ],
      },
    ],
  });

  if (data.length === 0)
    return next(new AppError(404, "No exercise available"));

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    results: data.length,
    message: "Data fetched successfully",
    data: data,
  });
});

exports.addNewExercise = catchAsync(async (req, res) => {
  const userID = req.user.id;
  const { name, bodyParts, equipments, exerciseType } = req.body;

  await Exercise.create({
    userID,
    name,
    bodyParts,
    equipments,
    exerciseType,
  });

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Data created successfully",
    data: req.body,
  });
});

exports.exerciseDetails = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const _id = req.params.id;

  const data = await Exercise.findOne({
    _id,
    $or: [{ userID, isGlobal: false }, { isGlobal: true }],
  });

  if (!data) return next(new AppError(404, "Exercise not found"));

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Data fetched successfully",
    data,
  });
});

exports.updateExercise = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const _id = req.params.id;
  const { name, imageUrl, bodyParts, equipments, exerciseType } = req.body;

  const editedExercise = await Exercise.findOneAndUpdate(
    { _id, userID, isGlobal: false },
    { name, imageUrl, bodyParts, equipments, exerciseType },
  );

  if (!editedExercise)
    return next(
      new AppError(
        404,
        "Cannot edit an exercise that wasn't created by the user",
      ),
    );

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Data updated successfully",
  });
});

exports.deleteExercise = catchAsync(async (req, res, next) => {
  const userID = req.user.id;
  const _id = req.params.id;

  const deletedExercise = await Exercise.findOneAndUpdate(
    { _id, userID, isGlobal: false },
    { isActive: false },
  );

  if (!deletedExercise)
    return next(
      new AppError(
        404,
        "Cannot delete an exercise that wasn't created by the user",
      ),
    );

  res.status(200).json({
    status: "ok",
    request: `${req.method} ${req.baseUrl}`,
    message: "Data deleted successfully",
  });
});
