const catchAsyncError = require('../utils/catchAsyncError');
const User = require('./../models/userModel');

exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
