import * as express from 'express';
import * as loginCtrl from '../controllers/login.controller';

let router: express.Router = express.Router();
router.route('/').post(loginCtrl.login);
router.route('/register').post(loginCtrl.register);

export default router;
