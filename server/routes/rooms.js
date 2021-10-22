const router = require('express').Router();
const { RoomController } = require('../controllers');

router.get('/', (...params) => RoomController.getRooms(...params));

module.exports = router;