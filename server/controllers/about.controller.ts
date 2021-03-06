import * as aboutCacher from '../services/cache/about.cacher';
import * as aboutDao from '../data-access/about.dao';
import { Request, Response } from 'express';
import * as logger from '../services/logger';

function isIndexed(update: any): boolean {
    let field = Object.keys(update)[0];
    return update[field][0] && update[field][0].index !== undefined;
}

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
            let finish = () => { res.send({ success }); aboutCacher.update(); };
            if (isIndexed(req.body)) {
                aboutDao.sortField(req.body).then(finish);
            } else {
                finish();
            }
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function addElement(req: Request, res: Response): void {
    aboutDao.addElement(req.body)
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
    aboutDao.removeElement(req.body)
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
