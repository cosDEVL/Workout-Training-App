const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../model/userSchema");

exports.userData = catchAsync(async (req, res, next) => {
  const userID = req.user.id;

  const userData = await User.findById(userID);

  if (!userData) return next(new AppError(404, "User not found"));

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "User data retrieved",
    data: userData,
  });
});
