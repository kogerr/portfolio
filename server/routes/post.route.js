let express = require('express');
let postCtrl = require('../controllers/post.controller');

router = express.Router();
router.route('/').post(postCtrl.savePost).get(postCtrl.getPosts);
router.route('/:titleURL').get(postCtrl.getPostByTitleURL);
module.exports = router;
