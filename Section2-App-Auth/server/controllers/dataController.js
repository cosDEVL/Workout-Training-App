const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Data = require("../models/dataSchema");

exports.allData = catchAsync(async (req, res, next) => {
  const data = await Data.find({ userID: req.user.id });

  if (!data || data.length === 0)
    return next(new AppError(404, "Data not found"));

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "Data retrieved",
    data,
  });
});

exports.singleData = catchAsync(async (req, res, next) => {
  const { dataID } = req.params;
  const userID = req.user.id;

  const data = await Data.findOne({ _id: dataID, userID });

  if (!data) return next(new AppError(404, "Data not found"));

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "Data retrieved",
    data,
  });
});

exports.addData = catchAsync(async (req, res) => {
  const userID = req.user.id;
  const { data } = req.body;

  const newData = await Data.create({
    userID,
    data,
  });

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "Data posted",
    data: newData,
  });
});

exports.updateData = catchAsync(async (req, res, next) => {
  const { dataID } = req.params;
  const userID = req.user.id;
  const { data } = req.body;

  const newData = await Data.findOneAndUpdate(
    { _id: dataID, userID },
    { data },
    {
      returnDocument: true,
      runValidators: true,
    },
  );

  if (!newData) return next(new AppError(404, "Data not found"));

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "Data updated",
    data: newData,
  });
});

exports.deleteData = catchAsync(async (req, res) => {
  const { dataID } = req.params;
  const userID = req.user.id;

  await Data.findOneAndDelete({ _id: dataID, userID });

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "Data deleted",
  });
});
