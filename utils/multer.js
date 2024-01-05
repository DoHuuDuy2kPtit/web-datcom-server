const multer = require('multer');
const { memoryStorage } = require('multer');

const upload = multer({
  storage: memoryStorage(),
});

module.exports = upload;
