import * as aboutCacher from '../services/cache/about.cacher';
import * as aboutDao from '../data-access/about.dao';
import { Request, Response } from 'express';
import * as logger from '../services/logger';

export function getAbout(req: Request, res: Response): void {
    let cachedAbout = aboutCacher.getAbout();
    if (cachedAbout) {
        res.statusCode = 200;
        res.send(cachedAbout);
    } else {
        aboutDao.getAbout()
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
    aboutDao.updateAbout(req.body)
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

export function addElement(req: Request, res: Response): void {
    let update;
    if (req.body.plaintext) {
        update = req.body.plaintext;
    } else {
        update = req.body;
    }
    aboutDao.addElement(req.params.type, update)
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

export function removeElement(req: Request, res: Response): void {
    aboutDao.removeElement(req.params.type, req.body)
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
