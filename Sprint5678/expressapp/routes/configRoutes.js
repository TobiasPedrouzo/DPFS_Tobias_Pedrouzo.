const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const configController = require('../controllers/configController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../../public/images/docs')),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.get('/apply', configController.applyForm);
router.post('/apply', upload.array('documents', 5), configController.processApply);

router.get('/verify', configController.verifyForm);
router.post('/verify', upload.array('documents', 5), configController.processVerify);

module.exports = router;

