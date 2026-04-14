import * as postDao from '../../data-access/post.dao';
import generateTemplate from './template-generator';
import { Request, Response } from 'express';

const workRegex = /\/work\/(.*)/;

export default function(req: Request, res: Response): void {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const match = req.url.match(workRegex);
    if (!match) {
        res.statusCode = 404;
        res.send('Not found');
        return;
    }
    const titleURL = match[1];
    postDao.getPostByTitleURL(titleURL)
        .then((post) => {
            const response = generateTemplate(post);
            res.send(response);
        })
        .catch((err) => {
            res.statusCode = 500;
            res.send('Error generating metadata');
        });
}
