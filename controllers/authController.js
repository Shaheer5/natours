const AppError = require('../utils/appError');
const catchAsyncError = require('../utils/catchAsyncError');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check if email and password are entered
  if (!email || !password) {
    return next(new AppError('Please enter email and password', 400));
  }
  // 2. check if email and password are correct
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Email or Password is incorrect', 401));
  }
  // 3. if everything is ok, send jwt to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
