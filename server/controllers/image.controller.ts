import * as storageService from '../services/storage.service';
import resize from '../services/resize.service';
import { Request, Response } from 'express';
import * as logger from '../services/logger';

const directory = 'dist/images/';

export function returnSavedFileName(req: Request, res: Response): void {
    let response = { name: req.file.filename };
    if (response.name) {
        res.statusCode = 201;
    } else {
        res.statusCode = 404;
    }
    res.send(response);
}

export function deleteImage(req: Request, res: Response): void {
    storageService.deleteImage(req.params.filename)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send(err);
        });
}

export function crop(req: Request, res: Response): void {
    let filePath = directory + '/' + req.params.filename;
    let newName = storageService.generateFilename(req.params.filename);
    let newPath = directory + '/' + newName;
    let proportions = req.body;
    resize(filePath, newPath, proportions).then(() => {
        res.statusCode = 200;
        res.send({ name: newName });
    }).catch((err) => {
        logger.error(err);
        res.statusCode = 501;
        res.send(err);
    });
}
