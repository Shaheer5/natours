exports.checkId = (req, res, next, val) => {
  console.log(`the id for user is ${val}`);
  next();
};

exports.getUsers = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'failed',
    message: 'This user route is not yet defined',
  });
};
