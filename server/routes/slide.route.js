let express = require('express');
let slideCtrl = require('../controllers/slide.controller');

let router = express.Router();
router.route('/').get(slideCtrl.getSlides).post(slideCtrl.saveSlide);

module.exports = router;