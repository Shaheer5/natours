const express = require('express');
const router = express.Router();
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

router.route('/').get(getTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
