const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware 😍');
  next();
});
app.use((req, res, next) => {
  req.time = new Date().toDateString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route Handlers

// Get All Tours
const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.time,
    results: tours.length,
    data: {
      tours,
    },
  });
};

// Get a single Tour
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length - 1)
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'The id does not correspond to any tour',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// Create new Tour
const createTour = (req, res) => {
  newId = tours[tours.length - 1].id + 1;
  newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// Update/Patch the Tour
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'The id does not correspond to any tour',
    });

  const updateTour = { ...tour, days: 20 };
  const index = tours.findIndex((el) => el.id === id);
  tours[index] = updateTour;

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: updateTour,
        },
      });
    }
  );
};

// Delete the Tour
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour)
    res.status(404).json({
      status: 'fail',
      message: 'The id does not correspond to any tour',
    });

  const updateTour = tours.filter((el) => el.id !== id);
  tours.length = 0;
  tours.push(...updateTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        results: tours.length,
        data: null,
      });
    }
  );
};

// Routes

// 1st way

// app.get('/api/v1/tours', getTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 2nd way
app.route('/api/v1/tours').get(getTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Server
const port = 3000;
app.listen(port, () => {
  console.log('app running on port: ' + port);
});
