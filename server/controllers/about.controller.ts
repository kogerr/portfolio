import * as dbService from '../services/db.service';
import { Request, Response } from 'express';

export function getAbout(req: Request, res: Response): void {
    dbService.getAbout()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            res.statusCode = 404;
            res.send(err);
        });
}

export function updateAbout(req: Request, res: Response): void {
    dbService.updateAbout(req.body)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
        }).catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
}
