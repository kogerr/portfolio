import * as express from 'express';
import * as postCtrl from '../controllers/post.controller';
import * as tokenService from '../services/token.service';

let router: express.Router = express.Router();
router.route('/')
    .post(tokenService.checkToken, postCtrl.savePost)
    .get(postCtrl.getPosts);
router.route('/:titleURL')
    .get(postCtrl.getPostByTitleURL)
    .patch(tokenService.checkToken, postCtrl.updatePost);
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
