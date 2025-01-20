const Tour = require('../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(404).json({
      status: 'failed',
      message: 'Missing tour name or tour price',
    });

  next();
};

exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.time,
    // results: tours.length,
    data: {
      // tours,
    },
  });
};

// Create new Tour
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      // tour: newTour,
    },
  });
};

// Get a single Tour
exports.getTour = (req, res) => {
  // const tour = tours.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: 'success',
    data: {
      // tour,
    },
  });
};

// Update/Patch the Tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updatedTour',
    },
  });
};

// Delete the Tour
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
