module.exports = function(app) {
//let express = require('express');
    let postCtrl = require('../controllers/post.controller');

/*exports.router = express.Router();
exports.router.route('/').post(postCtrl.create);*/

    app.route('/').post(postCtrl.create).get(postCtrl.test);
};