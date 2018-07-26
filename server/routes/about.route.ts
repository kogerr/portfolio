import * as express from 'express';
import * as aboutCtrl from '../controllers/about.controller';
import * as tokenService from '../services/token.service';

let router: express.Router = express.Router();
router.route('/')
    .get(aboutCtrl.getAbout)
    .post(tokenService.checkToken, aboutCtrl.updateAbout)
    .put(tokenService.checkToken, aboutCtrl.addElement)
    .delete(tokenService.checkToken, aboutCtrl.removeElement);

export default router;
