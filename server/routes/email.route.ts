import * as express from 'express';
import * as emailCtrl from '../controllers/email.controller';
import * as tokenService from '../services/token.service';

let router: express.Router = express.Router();
router.route('/').get(tokenService.checkToken, emailCtrl.getEmails);
router.route('/:id').get(tokenService.checkToken, emailCtrl.deleteEmailById);

export default router;
