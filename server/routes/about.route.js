let express = require('express');
let aboutCtrl = require('../controllers/about.controller');

let router = express.Router();
router.route('/').get(aboutCtrl.getAbout);
module.exports = router;
