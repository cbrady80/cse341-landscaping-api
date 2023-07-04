const auth = (req, res, next) => {
  try{
    if (req.session.token) {
      next();
    }
    else {
      throw new Error("Please log in by going to https://www.landscapingapi.onrender.com/login");
    }
  }
  catch(err) {res.status(500).json({ message: err.message })};
};

module.exports = {auth};

// const jwt = require('jsonwebtoken');
// const User = require('./../models/user');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('../utils/appError');

// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// exports.signup = catchAsync(async (req, res, next) => {
//   const newUser = await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     passwordConfirm: req.body.passwordConfirm,
//   });
//   const token = signToken(newUser._id);
//   res.status(201).json({
//     status: 'success',
//     token,
//     data: {
//       user: newUser,
//     },
//   });
// });

// exports.login = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return next(new AppError('Please provide email and password.', 400));
//   }

//   const user = await User.findOne({ email }).select('+password');

//   if (!user || !(await user.correctPassword(password, user.password))) {
//     return next(new AppError('Incorrect email or password', 401));
//   }

//   const token = signToken(user._id);
//   res.status(200).json({
//     status: 'success',
//     token,
//   });
// });