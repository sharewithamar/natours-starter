const express = require('express');
const router = express.Router();
const {
  checkId,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour
} = require('../controllers/tourController'); //destructuring

router.param('id', checkId);
router
  .route('/')
  .get(getAllTours)
  .post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
