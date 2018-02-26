let express = require('express');
let postCtrl = require('../controllers/post.controller');

router = express.Router();
router.route('/').post(postCtrl.savePost).get(postCtrl.getPosts);
module.exports = router;
