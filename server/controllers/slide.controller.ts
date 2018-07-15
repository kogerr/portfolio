import * as dbService from '../services/db.service';
import * as logger from '../services/logger';
import * as slideCacher from '../services/cache/slide.cacher';
import { Request, Response } from 'express';

export function getSlides(req: Request, res: Response): void {
    let cachedPosts = slideCacher.getSlides();
    if (cachedPosts && cachedPosts.length) {
        res.statusCode = 200;
        res.send(cachedPosts);
    } else {
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
}

export function saveSlide(req: Request, res: Response): void {
    dbService.saveSlide(req.body)
        .then(data => {
            res.statusCode = 200;
            res.send(data);
            slideCacher.update();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function updateSlide(req: Request, res: Response): void {
    dbService.updateSlide(req.params.imageURL, req.body)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
            slideCacher.update();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function deleteSlide(req: Request, res: Response): void {
    dbService.deleteSlide(req.params.imageURL)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
            slideCacher.update();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}
