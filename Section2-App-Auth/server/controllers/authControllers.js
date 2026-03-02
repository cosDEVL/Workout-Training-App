const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const transport = require("../utils/mailTransporter");

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
    "+isActive",
  ]);

  // Verifica esistenza utente o correttezza password
  if (
    !user ||
    !user.isActive ||
    !(await user.correctPassword(password, user.password))
  )
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
  const { username, email } = req.body;

  await User.findByIdAndUpdate(
    req.user.id,
    { username, email },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "User data updated",
  });
});

exports.deleteSelf = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });

  res.cookie("jwt", "deactivate", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.cookie("accessToken", "deactivate", {
    expires: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "User deactivated",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const user = await User.findById(req.user.id).select([
    "+password",
    "+tokenVersion",
  ]);

  if (!user || !(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError(400, "Please, provide a valid password"));
  }

  await user.changePassword(newPassword, confirmNewPassword);
  await user.revokeToken();

  createSendToken(user, req, res, 200, "User password updated");
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return next(new AppError(401, "Please, enter a valid Email"));

  const user = await User.findOne({ email });

  if (!user) return next(new AppError(404, "No user found with that email"));

  const resetToken = await user.createResetToken();

  await transport.sendMail({
    from: "server@email.test",
    to: `${email}`,
    subject: "Reset Password",
    text: `Reset Password Token: ${resetToken}`,
  });

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "Email sent. Check your mail box",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { resetToken } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  const user = await User.findOne({ resetToken }).select([
    "+tokenVersion",
    "+password",
  ]);

  if (!user || Date.now() >= new Date(user.resetExpiresAt))
    return next(new AppError(401, "Invalid token or reset no more available"));

  const compareResult = await user.correctPassword(newPassword, user.password);

  if (compareResult)
    return next(
      new AppError(403, "The password inserted matches with the current one"),
    );

  await user.changePassword(newPassword, confirmNewPassword);
  await user.revokeToken();

  res.status(200).json({
    status: "success",
    request: `${req.method} ${req.originalUrl}`,
    message: "Password Reset succeded",
  });
});
