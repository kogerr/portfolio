import * as contactCacher from '../services/cache/contact.cacher';
import * as dbService from '../services/db.service';
import { Request, Response } from 'express';
import * as logger from '../services/logger';

export function getContact(req: Request, res: Response): void {
    let cachedContact = contactCacher.getContact();
    if (cachedContact) {
        res.statusCode = 200;
        res.send(cachedContact);
    } else {
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
}

export function updateContact(req: Request, res: Response): void {
    dbService.updateContact(req.body)
        .then(data => {
            let success = data.ok === 1;
            res.statusCode = 200;
            res.send({ success });
            contactCacher.update();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}
