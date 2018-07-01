let express = require('express');
let postCtrl = require('../controllers/post.controller');
let tokenService = require('../services/token.service');

let router = express.Router();
router.route('/').post(tokenService.checkToken, postCtrl.savePost).get(postCtrl.getPosts);
router.route('/:titleURL').get(postCtrl.getPostByTitleURL).patch(tokenService.checkToken, postCtrl.updatePost);
router.route('/:titleURL/check').get(postCtrl.checkPost);
router.route('/:titleURL/previous').get(postCtrl.getPreviousPostTitleUrl);
router.route('/:titleURL/next').get(postCtrl.getNextPostTitleUrl);
router.route('/metadata/').post(postCtrl.saveMetaData);
module.exports = router;
