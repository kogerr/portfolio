import * as postDao from '../data-access/post.dao';
import * as responseCacher from '../services/cache/metadata.cacher';
import * as postCacher from '../services/cache/post.cacher';
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
            let success = data.every(e => e.ok === 1);
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
    let cachedPosts = postCacher.getPosts();
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
    let cachedPost = postCacher.getPost(req.params.titleURL);
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
    let cacheStart = process.hrtime();
    postCacher.getPosts();
    let cacheTime = process.hrtime(cacheStart)[1];

    let dbStart = process.hrtime();
    postDao.getPosts()
        .then(() => {
            let dbTime = process.hrtime(dbStart)[1];
            let difference = dbTime - cacheTime;
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
}
