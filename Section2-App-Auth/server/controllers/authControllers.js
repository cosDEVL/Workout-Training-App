const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const signToken = (id, tokenVersion) => {
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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

  // 2. Si genera un token che fa riferimento all'utente creato e la si invia nella response
  const token = signToken(newUser._id, newUser.tokenVersion);

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "SignUp succeded",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Verifica dati digitati
  if (!email || !password)
    return next(
      new AppError(400, "Please, provide a valid email and password"),
    );

  // Ricerca utente
  const user = await User.findOne({ email: email }).select("+password");
  // Avvia modulo per verificare password
  const correct = await user.correctPassword(password, user.password);

  // Verifica esistenza utente o correttezza password
  if (!user || !correct)
    return next(new AppError(401, "Email or Password incorrect. Try Again"));

  // Prima di creare il nuovo token, invalida quello/i precedente/i
  await user.revokeToken();
  const token = signToken(user._id, user.tokenVersion);

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "LogIn succeded",
    token,
  });
});

exports.logout = catchAsync(async (req, res) => {
  // // Cerca utente --- Da definire ancora il middleware "protect"
  // const user = User.findById(req.user.id);

  // // Da implementare controllo Utentea

  // // Invalida tutti i token passati
  // await user.revokeToken();

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
