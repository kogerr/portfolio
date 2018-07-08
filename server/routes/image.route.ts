import * as express from 'express';
import * as multer from 'multer';
import * as storageService from '../services/storage.service';
let upload: multer.Instance = multer({ storage: storageService.storage });
import * as imageCtrl from '../controllers/image.controller';

let router: express.Router = express.Router();
router.route('/').post(upload.single('image'), imageCtrl.returnSavedFileName);
router.route('/:filename').delete(imageCtrl.deleteImage).patch(imageCtrl.crop);

export default router;
