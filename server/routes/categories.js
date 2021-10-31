const router = require('express').Router();

const  { CategoryController } = require('../controllers');

router.get('/', (...params) => CategoryController.getCategories(...params));
router.post('/create', (...params) => CategoryController.createCategory(...params));
router.post('/update', (...params) => CategoryController.updateCategory(...params));
router.post('/delete', (...params) => CategoryController.deleteCategory(...params));


module.exports = router;