let express = require('express');
let testCtrl = require('../controllers/test.controller');

let router = express.Router();
router.route('/').get(testCtrl.logHeaders);
module.exports = router;
