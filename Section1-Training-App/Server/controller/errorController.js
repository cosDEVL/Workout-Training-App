module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "ERROR";

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("error: ", err);

    res.status(500).json({
      status: "ERROR",
      message: "Something went wrong!",
    });
  }
};
