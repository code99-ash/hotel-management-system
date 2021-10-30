const router = require('express').Router();
const { BookingController } = require('../controllers');

router.post('/availables', (...params) => BookingController.fetchAvailable(...params));

module.exports = router;