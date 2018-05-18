let express = require('express');
let postCtrl = require('../controllers/post.controller');

router = express.Router();
router.route('/').post(postCtrl.savePost).get(postCtrl.getPosts);
router.route('/:titleURL').get(postCtrl.getPostByTitleURL).patch(postCtrl.updatePost);
router.route('/:titleURL/check').get(postCtrl.checkPost);
router.route('/:titleURL/previous').get(postCtrl.getPreviousPostTitleUrl);
router.route('/:titleURL/next').get(postCtrl.getNextPostTitleUrl);
module.exports = router;
