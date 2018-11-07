import * as express from 'express';
import * as emailCtrl from '../controllers/email.controller';

let router: express.Router = express.Router();
router.route('/').get(emailCtrl.getEmails);
router.route('/:id').get(emailCtrl.deleteEmailById);

export default router;
