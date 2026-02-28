const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const User = require("../models/userSchema");

exports.signup = catchAsync(async (req, res) => {
  res.status(502).json({
    status: "Warning!",
    request: `${req.method} ${req.originalUrl}`,
    message: "Route not defined yet",
  });
});

exports.login = catchAsync(async (req, res) => {
  res.status(502).json({
    status: "Warning!",
    request: `${req.method} ${req.originalUrl}`,
    message: "Route not defined yet",
  });
});

exports.logout = catchAsync(async (req, res) => {
  res.status(502).json({
    status: "Warning!",
    request: `${req.method} ${req.originalUrl}`,
    message: "Route not defined yet",
  });
});

exports.updateSelf = catchAsync(async (req, res) => {
  res.status(502).json({
    status: "Warning!",
    request: `${req.method} ${req.originalUrl}`,
    message: "Route not defined yet",
  });
});

exports.deleteSelf = catchAsync(async (req, res) => {
  res.status(502).json({
    status: "Warning!",
    request: `${req.method} ${req.originalUrl}`,
    message: "Route not defined yet",
  });
});

exports.updatePassword = catchAsync(async (req, res) => {
  res.status(502).json({
    status: "Warning!",
    request: `${req.method} ${req.originalUrl}`,
    message: "Route not defined yet",
  });
});

exports.forgotPassword = catchAsync(async (req, res) => {
  res.status(502).json({
    status: "Warning!",
    request: `${req.method} ${req.originalUrl}`,
    message: "Route not defined yet",
  });
});

exports.resetPassword = catchAsync(async (req, res) => {
  res.status(502).json({
    status: "Warning!",
    request: `${req.method} ${req.originalUrl}`,
    message: "Route not defined yet",
  });
});
