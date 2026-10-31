const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const usersValidator = require('../middlewares/validators/usersValidator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'avatar-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage });

// Register
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('avatar'), usersValidator.register, usersController.processRegister);

// Login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersValidator.login, usersController.processLogin);

// Profile
router.get('/profile', authMiddleware, usersController.profile);

// Logout
router.post('/logout', authMiddleware, usersController.logout);

module.exports = router;

