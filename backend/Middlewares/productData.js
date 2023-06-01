const multer = require('multer');

const upload = multer({dest : "uploads/"});
const productData = upload.single("file");

module.exports = productData;