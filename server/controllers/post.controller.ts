import * as postDao from '../data-access/post.dao';
import * as responseCacher from '../services/cache/metadata.cacher';
import * as postCacher from '../services/cache/post.cacher';
import * as preloaderCacher from '../services/cache/preloader.cacher';
import * as logger from '../services/logger';
import { Request, Response } from 'express';

export function savePost(req: Request, res: Response): void {
    postDao.savePost(req.body)
        .then(() => {
            res.statusCode = 201;
            res.send({ success: true });
            updateCache();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function updatePost(req: Request, res: Response): void {
    postDao.updatePost(req.body)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
            updateCache();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function updateIndices(req: Request, res: Response): void {
    postDao.updateIndices(req.body)
        .then(data => {
            const success = data.every(e => e.ok === 1);
            res.statusCode = 200;
            res.send({ success });
            updateCache();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function getPosts(req: Request, res: Response): void {
    const cachedPosts = postCacher.getPosts();
    if (cachedPosts && cachedPosts.length) {
        res.statusCode = 200;
        res.send(cachedPosts);
    } else {
        postDao.getPosts()
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

export function getPostByTitleURL(req: Request, res: Response): void {
    const cachedPost = postCacher.getPost(req.params.titleURL);
    if (cachedPost) {
        res.statusCode = 200;
        res.send(cachedPost);
    } else {
        postDao.getPostByTitleURL(req.params.titleURL)
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

export function deletePostByTitleURL(req: Request, res: Response): void {
    postDao.deletePostByTitleURL(req.params.titleURL)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
            updateCache();
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send(err);
        });
}

export function checkPost(req: Request, res: Response): void {
    res.statusCode = 200;
    postDao.checkPostByTitleURL(req.params.titleURL)
        .then((data) => res.send(data));
}

export function getPreviousPostTitleUrl(req: Request, res: Response): void {
    postDao.getPreviousPostTitleUrl(req.params.titleURL)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send(err);
        });
}

export function getNextPostTitleUrl(req: Request, res: Response): void {
    postDao.getNextPostTitleUrl(req.params.titleURL)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send(err);
        });
}

export function saveMetaData(req: Request, res: Response): void {
    responseCacher.saveMetaData(req.body);
    res.statusCode = 200;
    res.send(responseCacher.getMetaData(req.body.titleURL));
}

export function cacherTest(req: Request, res: Response): void {
    const cacheStart = process.hrtime();
    postCacher.getPosts();
    const cacheTime = process.hrtime(cacheStart)[1];

    const dbStart = process.hrtime();
    postDao.getPosts()
        .then(() => {
            const dbTime = process.hrtime(dbStart)[1];
            const difference = dbTime - cacheTime;
            res.statusCode = 200;
            res.send({ cacheTime, dbTime, difference });
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send(err);
        });
}

function updateCache(): void {
    responseCacher.update();
    postCacher.update();
    preloaderCacher.update();
}
