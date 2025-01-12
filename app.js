const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

// Router

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Server
const port = 3000;
app.listen(port, () => {
  console.log('app running on port: ' + port);
});
