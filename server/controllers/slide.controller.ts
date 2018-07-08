import * as dbService from '../services/db.service';
import { Request, Response } from 'express';

export let getSlides = (req: Request, res: Response): void => {
    dbService.getSlides()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((error) => {
            res.statusCode = 404;
            res.send(error);
        });
};

export let saveSlide = (req: Request, res: Response): void => {
    dbService.saveSlide(req.body)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
        }).catch((error) => {
            res.statusCode = 500;
            res.send(error);
        });
};
