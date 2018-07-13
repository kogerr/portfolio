import * as express from 'express';
import * as slideCtrl from '../controllers/slide.controller';
import * as tokenService from '../services/token.service';

let router: express.Router = express.Router();
router.route('/').get(slideCtrl.getSlides).post(tokenService.checkToken, slideCtrl.saveSlide);

export default router;
