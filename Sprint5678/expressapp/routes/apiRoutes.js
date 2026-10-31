const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Users
router.get('/users', apiController.usersList);
router.get('/users/:id', apiController.userDetail);

// Products
router.get('/products', apiController.productsList);
router.get('/products/:id', apiController.productDetail);

module.exports = router;

