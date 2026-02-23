exports.workoutList = (req, res) => {
  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};

exports.addNewWorkout = (req, res) => {
  console.log(req.body);

  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};

exports.deleteAllWorkouts = (req, res) => {
  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};

exports.workoutDetails = (req, res) => {
  console.log(req.params.id);

  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};

exports.updateWorkout = (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};

exports.deleteWorkout = (req, res) => {
  console.log(req.params.id);

  res.status(501).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};
