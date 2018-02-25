let express = require('express');
let multer = require('multer');
let upload = multer();
let imageCtrl = require('../controllers/image.controller');

router = express.Router();
router.route('/')
    .post(upload.single('cover-image'), imageCtrl.saveCover)
    .get(imageCtrl.test);
module.exports = router;
