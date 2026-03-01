const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const signToken = (id, tokenVersion, randomString) => {
  return jwt.sign({ id, tokenVersion, randomString }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, req, res, statusCode, message = "") => {
  const randomString = crypto.randomUUID();
  // Si genera un token che fa riferimento all'utente creato/loggato
  // Standard Bouncer
  const standardToken = signToken(user._id, user.tokenVersion);
  // Fort Knox Bouncer
  const fortKnoxToken = signToken(user._id, user.tokenVersion, randomString);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: true,
  };

  // if (process.env.NODE_ENV === "production") {
  //   cookieOptions.secure = true;
  // }

  res.cookie("jwt", fortKnoxToken, cookieOptions);
  // cookie per approccio fortKnoxBouncer
  res.cookie("accessToken", randomString, {
    ...cookieOptions,
    httpOnly: false,
  });

  res.status(statusCode).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message,
    token: fortKnoxToken,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  // 1. Si crea il documento dell'utente
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });

  newUser.password = undefined;

  // Crea token, lo salva nei cookie, e invia la response
  createSendToken(newUser, req, res, 200, "Sign-Up succeded");
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Verifica dati digitati
  if (!email || !password)
    return next(
      new AppError(400, "Please, provide a valid email and password"),
    );

  // Ricerca utente
  const user = await User.findOne({ email: email }).select([
    "+password",
    "+tokenVersion",
  ]);

  // Verifica esistenza utente o correttezza password
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError(401, "Email or Password incorrect. Try Again"));

  // Prima di creare il nuovo token, invalida quello/i precedente/i
  await user.revokeToken();

  // Crea token, lo salva nei cookie, e invia la response
  createSendToken(user, req, res, 200, "Log-In succeded");
});

exports.logout = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select("+tokenVersion");
  // Invalida tutti i token passati
  await user.revokeToken();

  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.cookie("accessToken", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "LogOut succeded",
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
