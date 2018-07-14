import * as express from 'express';
import * as postCtrl from '../controllers/post.controller';
import * as tokenService from '../services/token.service';

let router: express.Router = express.Router();
router.route('/')
    .get(postCtrl.getPosts)
    .put(tokenService.checkToken, postCtrl.savePost);
router.route('/indices')
    .post(tokenService.checkToken, postCtrl.updateIndices);
router.route('/:titleURL')
    .get(postCtrl.getPostByTitleURL)
    .patch(tokenService.checkToken, postCtrl.updatePost)
    .delete(tokenService.checkToken, postCtrl.deletePostByTitleURL);
router.route('/:titleURL/check')
    .get(postCtrl.checkPost);
router.route('/:titleURL/previous')
    .get(postCtrl.getPreviousPostTitleUrl);
router.route('/:titleURL/next')
    .get(postCtrl.getNextPostTitleUrl);
router.route('/metadata/')
    .post(postCtrl.saveMetaData);
router.route('/cache/test')
    .get(postCtrl.cacherTest);

export default router;
