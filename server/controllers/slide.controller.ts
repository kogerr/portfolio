import * as dbService from '../services/db.service';
import * as logger from '../services/logger';
import { Request, Response } from 'express';

export function getSlides(req: Request, res: Response): void {
    dbService.getSlides()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send(err);
        });
}

export function saveSlide(req: Request, res: Response): void {
    dbService.saveSlide(req.body)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}
