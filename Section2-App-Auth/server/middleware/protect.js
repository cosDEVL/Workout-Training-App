const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const User = require("../models/userSchema");

exports.standardBouncer = catchAsync(async (req, res, next) => {
  // Recupero AUTH header
  const headerAuth = req.headers.authorization;
  let token;

  // Checking e Parsing del header e recupero token
  if (headerAuth && headerAuth.startsWith("Bearer")) {
    token = headerAuth.split(" ")[1];
  }

  // Verifica token
  if (!token) {
    return next(new AppError(401, "You are not logged in."));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Recupero e verifica user
  const user = await User.findById(decoded.id).select("+tokenVersion");
  if (!user || decoded.tokenVersion !== user.tokenVersion) {
    return next(new AppError(404, "User ID or Token not valid"));
  }

  req.user = user;
  next();
});

exports.fortKnoxBouncer = catchAsync(async (req, res, next) => {
  const jsonToken = req.cookies.jwt;
  const headerAuth = req.headers.authorization;
  let headerToken;

  if (headerAuth && headerAuth.startsWith("Bearer")) {
    headerToken = headerAuth.split(" ")[1];
  }

  if (!headerToken) {
    return next(new AppError(401, "You are not logged in."));
  }
  const decodedJWT = await promisify(jwt.verify)(
    jsonToken,
    process.env.JWT_SECRET,
  );

  if (headerToken === decodedJWT.randomString) {
    const user = await User.findById(decodedJWT.id).select("+tokenVersion");

    console.log(decodedJWT, user);

    if (!user || decodedJWT.tokenVersion !== user.tokenVersion) {
      return next(new AppError(404, "User ID or Token not valid"));
    }

    req.user = user;
    next();
  } else {
    return next(new AppError(401, "Token not valid"));
  }
});
