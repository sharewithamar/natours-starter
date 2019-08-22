const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.static(`${__dirname}/public`));

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

/** Middlewares */
//console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from Middleware 😁');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/** Mounting Router */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/** Start the server */
module.exports = app;
