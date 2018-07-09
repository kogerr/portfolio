import * as dbService from '../services/db.service';
import * as responseCacher from '../services/cache/metadata.cacher';
import * as postCacher from '../services/cache/post.cacher';
import * as logger from '../services/logger';
import { Request, Response } from 'express';

export function savePost(req: Request, res: Response): void {
    dbService.savePost(req.body)
        .then(() => {
            res.statusCode = 201;
            res.send({ success: true });
            responseCacher.saveMetaData(req.body);
            postCacher.savePost(req.body);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function updatePost(req: Request, res: Response): void {
    dbService.updatePost(req.body)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
            responseCacher.saveMetaData(req.body);
            postCacher.updatePost(req.body);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function getPosts(req: Request, res: Response): void {
    let cachedPosts = postCacher.getPosts();
    if (cachedPosts.length) {
        res.statusCode = 200;
        res.send(cachedPosts);
    } else {
        dbService.getPosts()
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
        dbService.getPostByTitleURL(req.params.titleURL)
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

export function checkPost(req: Request, res: Response): void {
    res.statusCode = 200;
    dbService.checkPostByTitleURL(req.params.titleURL)
        .then((data) => res.send(data));
}

export function getPreviousPostTitleUrl(req: Request, res: Response): void {
    dbService.getPreviousPostTitleUrl(req.params.titleURL)
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
    dbService.getNextPostTitleUrl(req.params.titleURL)
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
    dbService.getPosts()
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
