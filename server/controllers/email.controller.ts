import * as emailDao from '../data-access/email.dao';
import * as logger from '../services/logger';
import { Request, Response } from 'express';

export function getEmails(req: Request, res: Response): void {
    emailDao.getEmails()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
        logger.error(err);
        res.statusCode = 404;
        res.send(err);
    });
}

export function saveEmail(req: Request, res: Response): void {
    emailDao.saveEmail(req.body)
        .then(() => {
            res.statusCode = 201;
            res.send({ success: true });
        }).catch((err) => {
        logger.error(err);
        res.statusCode = 500;
        res.send(err);
    });
}

export function deleteEmailById(req: Request, res: Response): void {
    emailDao.deleteEmailById(req.params.id)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
        logger.error(err);
        res.statusCode = 404;
        res.send(err);
    });
}
