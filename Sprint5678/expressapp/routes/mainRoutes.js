const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/home', (req, res) => res.redirect('/'));
router.get('/config', (req, res) => res.redirect('/config/apply'));
router.get('/login', mainController.login);
router.get('/register', mainController.register);
router.get('/ubicacion', mainController.location);
router.post('/ubicacion', mainController.saveLocation);
router.get('/hire', mainController.hire);

module.exports = router;