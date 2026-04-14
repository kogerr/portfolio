import * as express from 'express';
import * as multer from 'multer';
import * as path from 'path';
import * as storageService from '../services/storage.service';
import * as imageCtrl from '../controllers/image.controller';
import * as tokenService from '../services/token.service';

const fileFilter = (req: express.Request, file: any,
    cb: (error: Error | null, acceptFile: boolean) => void): void => {
    const allowedExtensions = /\.(jpeg|jpg|png|gif|webp|svg)$/i;
    const allowedMimeTypes = /^image\/(jpeg|png|gif|webp|svg\+xml)$/;
    const extOk = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowedMimeTypes.test(file.mimetype);
    if (extOk && mimeOk) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (JPEG, PNG, GIF, WebP, SVG) are allowed'), false);
    }
};

const upload: multer.Instance = multer({
    storage: storageService.storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,  // 10 MB maximum
        files: 1                       // Only one file per request
    }
});

const router: express.Router = express.Router();
router.route('/').post(tokenService.checkToken, upload.single('image'), imageCtrl.returnSavedFileName);
router.route('/:filename').delete(tokenService.checkToken, imageCtrl.deleteImage);
router.route('/preload').get(imageCtrl.getPreloaderImages);

export default router;
