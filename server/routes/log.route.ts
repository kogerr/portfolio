import * as express from 'express';
import * as logCtrl from '../controllers/log.controller';
import * as tokenService from '../services/token.service';

const router: express.Router = express.Router();
router.route('/').get(tokenService.checkToken, logCtrl.getErrorLogs);
router.route('/').delete(tokenService.checkToken, logCtrl.clearErrorLogs);

export default router;
