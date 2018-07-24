import * as aboutCacher from '../services/cache/about.cacher';
import * as dbService from '../services/db.service';
import { Request, Response } from 'express';
import * as logger from '../services/logger';

export function getAbout(req: Request, res: Response): void {
    let cachedAbout = aboutCacher.getAbout();
    if (cachedAbout) {
        res.statusCode = 200;
        res.send(cachedAbout);
    } else {
        dbService.getAbout()
            .then((data) => {
                res.statusCode = 200;
                res.send(data);
            }).catch((err) => {
                logger.error(err);
                res.statusCode = 404;
                res.send(err);
            });
    }
}

export function updateAbout(req: Request, res: Response): void {
    dbService.updateAbout(req.body)
        .then(data => {
            let success = data.ok === 1;
            res.statusCode = 200;
            res.send({ success });
            aboutCacher.update();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}
