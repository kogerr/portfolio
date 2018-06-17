let express = require('express');
let loginCtrl = require('../controllers/login.controller');

let router = express.Router();
router.route('/').post(loginCtrl.login);
module.exports = router;
