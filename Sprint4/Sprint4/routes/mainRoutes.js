const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/productDetail', mainController.productDetail);
router.get('/ubicacion', mainController.location); 

router.get('/products', mainController.productList);

router.get('/products/create', mainController.productCreate);

router.get('/products/:id', mainController.productDetail);

router.post('/products', mainController.productStore);

router.get('/products/:id/edit', mainController.productEdit);

router.put('/products/:id', mainController.productUpdate);

router.delete('/products/:id', mainController.productDelete);

module.exports = router;