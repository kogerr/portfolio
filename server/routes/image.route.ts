import * as express from 'express';
import * as multer from 'multer';
import * as storageService from '../services/storage.service';
let upload: multer.Instance = multer({ storage: storageService.storage });
import * as imageCtrl from '../controllers/image.controller';
import * as tokenService from '../services/token.service';

let router: express.Router = express.Router();
router.route('/').post(tokenService.checkToken, upload.single('image'), imageCtrl.returnSavedFileName);
router.route('/:filename').delete(tokenService.checkToken, imageCtrl.deleteImage).patch(tokenService.checkToken, imageCtrl.crop);
router.route('/preload').get(imageCtrl.getPreloaderImages);

export default router;
