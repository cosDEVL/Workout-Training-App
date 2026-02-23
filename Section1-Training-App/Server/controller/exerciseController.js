exports.exerciseList = (req, res) => {
  res.status(400).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};

exports.addNewExercise = (req, res) => {
  console.log(req.body);

  res.status(400).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};

exports.exerciseDetails = (req, res) => {
  console.log(req.params.id);

  res.status(400).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};

exports.updateExercise = (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.status(400).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};

exports.deleteExercise = (req, res) => {
  console.log(req.params.id);

  res.status(400).json({
    status: "Warning",
    request: `${req.method} ${req.baseUrl}`,
    message: "Route not defined yet",
  });
};
