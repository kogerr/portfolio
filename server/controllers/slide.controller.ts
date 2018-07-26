import * as slideDao from '../data-access/slide.dao';
import * as logger from '../services/logger';
import * as slideCacher from '../services/cache/slide.cacher';
import { Request, Response } from 'express';

export function getSlides(req: Request, res: Response): void {
    let cachedPosts = slideCacher.getSlides();
    if (cachedPosts && cachedPosts.length) {
        res.statusCode = 200;
        res.send(cachedPosts);
    } else {
        slideDao.getSlides()
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
    slideDao.saveSlide(req.body)
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
    slideDao.updateSlide(req.params.imageURL, req.body)
        .then(data => {
            let success = data.ok === 1;
            res.statusCode = 200;
            res.send({ success });
            slideCacher.update();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function deleteSlide(req: Request, res: Response): void {
    slideDao.deleteSlide(req.params.imageURL)
        .then(data => {
            let success = data.ok === 1;
            res.statusCode = 200;
            res.send({ success });
            slideCacher.update();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}
