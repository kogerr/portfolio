import * as express from 'express';
import * as loginCtrl from '../controllers/login.controller';

let router = express.Router();
router.route('/').post(loginCtrl.login);

export default router;
