import * as dbService from '../services/db.service';
import { Request, Response } from 'express';
import * as logger from '../services/logger';

export function getContact(req: Request, res: Response): void {
    dbService.getContact()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send(err);
        });
}

export function updateContact(req: Request, res: Response): void {
    dbService.updateContact(req.body)
        .then(data => {
            let success = data.ok === 1;
            res.statusCode = 200;
            res.send({ success });
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}
