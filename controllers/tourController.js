const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`the tour id is ${val}`);
  if (req.param.id * 1 > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'The id does not correspond to any tour',
    });
  next();
};

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
    results: tours.length,
    data: {
      tours,
    },
  });
};

// Create new Tour
exports.createTour = (req, res) => {
  newId = tours[tours.length - 1].id + 1;
  newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

// Get a single Tour
exports.getTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);

  // // if (id > tours.length - 1)
  // if (!tour)
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'The id does not correspond to any tour',
  //   });

  const tour = tours.find((el) => el.id === req.params.id * 1);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// Update/Patch the Tour
exports.updateTour = (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);

  const updateTour = { ...tour, days: 20 };
  const index = tours.findIndex((el) => el.id === req.params.id * 1);
  tours[index] = updateTour;

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
exports.deleteTour = (req, res) => {
  const updateTour = tours.filter((el) => el.id !== req.params.id * 1);
  tours.length = 0;
  tours.push(...updateTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
