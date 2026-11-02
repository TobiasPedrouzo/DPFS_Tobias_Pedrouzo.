const express = require('express');
const fs = require('fs');
const path = require('path');
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
router.get('/dashboard', (req, res) => {
    const dashboard = path.join(__dirname, '../../dashboard/dist/index.html');
    if (!fs.existsSync(dashboard)) {
        return res.status(503).send('El dashboard React todavía no está compilado. Ejecutá npm run dashboard:build.');
    }
    return res.sendFile(dashboard);
});

module.exports = router;
