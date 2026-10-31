const multer = require('multer');
const path = require('path');
const fs = require('fs');

const destination = path.join(__dirname, '../../public/images/users');
fs.mkdirSync(destination, { recursive: true });
const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-z0-9.]/gi, '-')}`)
});

module.exports = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\/(jpeg|png|gif)$/.test(file.mimetype))
});
