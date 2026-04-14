import * as aboutDao from '../data-access/about.dao';
import { Request, Response } from 'express';
import * as logger from '../services/logger';

function isIndexed(update: any): boolean {
    const field = Object.keys(update)[0];
    return update[field][0] && update[field][0].index !== undefined;
}

export function getAbout(req: Request, res: Response): void {
    aboutDao.getAbout()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send({ error: 'Failed to retrieve about data' });
        });
}

export function updateAbout(req: Request, res: Response): void {
    aboutDao.updateAbout(req.body)
        .then(data => {
            const success = data.ok === 1;
            res.statusCode = 200;
            const finish = () => { res.send({ success }); };
            if (isIndexed(req.body)) {
                aboutDao.sortField(req.body).then(finish).catch((sortErr) => {
                    logger.error(sortErr);
                    res.statusCode = 500;
                    res.send({ error: 'Failed to sort field' });
                });
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
            const success = data.ok === 1;
            res.statusCode = 200;
            res.send({ success });
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function removeElement(req: Request, res: Response): void {
    aboutDao.removeElement(req.body)
        .then(data => {
            const success = data.ok === 1;
            res.statusCode = 200;
            res.send({ success });
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}
