import * as storageService from '../services/storage.service';
import * as postDao from '../data-access/post.dao';
import { Request, Response } from 'express';
import * as logger from '../services/logger';
import { ContentType, ContentImage } from '../../src/app/models/post';

const directory = 'images/';

export function returnSavedFileName(req: Request, res: Response): void {
    const response = { name: req.file.filename };
    if (response.name) {
        res.statusCode = 201;
    } else {
        res.statusCode = 404;
    }
    res.send(response);
}

export function deleteImage(req: Request, res: Response): void {
    storageService.deleteImage(req.params.filename)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send(err);
        });
}

export function getPreloaderImages(req: Request, res: Response): void {
    postDao.getPosts()
        .then((posts) => {
            const coverImages = posts.map(p => p.cover);
            const contentImages = posts
                .map(p => p.contents.filter(c => c.type === ContentType.image)[0])
                .filter(x => x)
                .map(i => (i as ContentImage).name);
            const images = [...coverImages, ...contentImages];
            res.statusCode = 200;
            res.send(images);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send({ error: 'Failed to retrieve preloader images' });
        });
}
