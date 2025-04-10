const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');

exports.checkId = (req, res, next, val) => {
  console.log(`the id for user is ${val}`);
  next();
};

exports.getUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});
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
