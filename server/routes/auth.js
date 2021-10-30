const express = require('express');
const  { AuthController } = require('../controllers');

const router = express.Router();

router.post('/register', (...params) => AuthController.Register(...params))
router.post('/login', (...params) => AuthController.Login(...params))
router.get('/user', (...params) => AuthController.VerifyToken(...params))


module.exports = router;