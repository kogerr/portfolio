let express = require('express');
let multer = require('multer');
let storageService = require('../services/storage.service');
let upload = multer({ storage: storageService.storage });
let imageCtrl = require('../controllers/image.controller');
let dbService = require('../services/db.service');

let router = express.Router();
router.route('/:field').post(upload.single('image'), dbService.saveImage);
router.route('/:field/:filename').delete(imageCtrl.deleteImage);
module.exports = router;
