import * as express from 'express';
import * as slideCtrl from '../controllers/slide.controller';
import * as tokenService from '../services/token.service';

let router: express.Router = express.Router();
router.route('/')
    .get(slideCtrl.getSlides)
    .post(tokenService.checkToken, slideCtrl.saveSlide);

router.route('/:imageURL')
    .patch(tokenService.checkToken, slideCtrl.updateSlide)
    .delete(tokenService.checkToken, slideCtrl.deleteSlide);

export default router;
