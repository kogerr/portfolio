import * as postDao from '../data-access/post.dao';
import * as logger from '../services/logger';
import { Request, Response } from 'express';

export function savePost(req: Request, res: Response): void {
    postDao.savePost(req.body)
        .then(() => {
            res.statusCode = 201;
            res.send({ success: true });
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
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send(err);
        });
}

export function getPosts(req: Request, res: Response): void {
    postDao.getPosts()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send({ error: 'Failed to retrieve posts' });
        });
}

export function getPostByTitleURL(req: Request, res: Response): void {
    postDao.getPostByTitleURL(req.params.titleURL)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send({ error: 'Post not found' });
        });
}

export function deletePostByTitleURL(req: Request, res: Response): void {
    postDao.deletePostByTitleURL(req.params.titleURL)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            logger.error(err);
            res.statusCode = 404;
            res.send(err);
        });
}

export function checkPost(req: Request, res: Response): void {
    res.statusCode = 200;
    postDao.checkPostByTitleURL(req.params.titleURL)
        .then((data) => res.send(data))
        .catch((err) => {
            logger.error(err);
            res.statusCode = 500;
            res.send({ error: 'Failed to check post' });
        });
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
    // Metadata is now generated on-demand by the interceptor.
    // This endpoint can return a confirmation.
    res.statusCode = 200;
    res.send({ success: true });
}
