import * as express from 'express';
import * as contactCtrl from '../controllers/contact.controller';
import * as tokenService from '../services/token.service';

const router: express.Router = express.Router();
router.route('/')
    .get(contactCtrl.getContact)
    .post(tokenService.checkToken, contactCtrl.updateContact);

export default router;
