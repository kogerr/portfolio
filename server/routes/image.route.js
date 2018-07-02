let express = require('express');
let multer = require('multer');
let storageService = require('../services/storage.service');
let upload = multer({storage: storageService.storage});
let imageCtrl = require('../controllers/image.controller');

let router = express.Router();
router.route('/').post(upload.single('image'), imageCtrl.returnSavedFileName);
router.route('/:filename').delete(imageCtrl.deleteImage).patch(imageCtrl.crop);
module.exports = router;
