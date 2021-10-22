const router = require('express').Router();
const { CategoryController, AuthController } = require('./controllers');

// router.router('/user')
//     .post((...params) => AuthController.Register(...params))
//     .post((...params) => AuthController.Login(...params))

router
    .route('/category')
    .get('/', (...params) => CategoryController.getCategories(...params))
    .post('/', (...params) => CategoryController.createCategory(...params));


module.exports = router;

