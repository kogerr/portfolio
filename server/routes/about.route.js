/* eslint new-cap: [0, { 'newIsCapExceptions': ['express.Router'] }] */
let express = require('express');
let aboutCtrl = require('../controllers/about.controller');
let tokenService = require('../services/token.service');

let router = express.Router();
router.route('/')
    .get(aboutCtrl.getAbout)
    .post(tokenService.checkToken, aboutCtrl.updateAbout);
module.exports = router;
