const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandlers = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin'); // Allow cross-origin access from your frontend
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Router

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handling unhandled routes (operational errors)
app.all('*', (req, res, next) => {
  next(new AppError(`The request ${req.originalUrl} is not found on server`));
});
app.use(globalErrorHandlers);

module.exports = app;
