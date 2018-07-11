import * as express from 'express';
import * as slideCtrl from '../controllers/slide.controller';

let router: express.Router = express.Router();
router.route('/').get(slideCtrl.getSlides).post(slideCtrl.saveSlide);

export default router;
