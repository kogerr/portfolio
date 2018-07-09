import * as express from 'express';
import * as logCtrl from '../controllers/log.controller';
import * as tokenService from '../services/token.service';

let router: express.Router = express.Router();
router.route('/').get(tokenService.checkToken, logCtrl.getErrorLogs);

export default router;
