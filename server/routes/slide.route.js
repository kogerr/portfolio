let express = require('express');
let slideCtrl = require('../controllers/slide.controller');

router = express.Router();
router.route('/').get(slideCtrl.getSlides);

module.exports = router;