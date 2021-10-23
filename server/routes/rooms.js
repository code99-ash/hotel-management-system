const router = require('express').Router();
const { RoomController } = require('../controllers');

router.get('/', (...params) => RoomController.getRooms(...params));
router.post('/create', (...params) => RoomController.createRoom(...params));
router.post('/update', (...params) => RoomController.updateRoom(...params));
router.post('/delete', (...params) => RoomController.deleteRoom(...params));

module.exports = router;