const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');

router.param('id', tourController.checkId);
router.param('id', tourController.checkBody);

router.route('/').get(tourController.getTours).post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
