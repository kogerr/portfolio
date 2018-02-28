let express = require('express');
let multer = require('multer');
let storageService = require('../services/storage.service');
let upload = multer({ storage: storageService.storage });
let imageCtrl = require('../controllers/image.controller');

router = express.Router();
router.route('/')
    .post(upload.single('cover-image'), imageCtrl.returnSavedFileName);
module.exports = router;
