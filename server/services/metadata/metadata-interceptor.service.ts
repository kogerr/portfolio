import * as dbService from '../db.service';
import * as metaDataCacher from '../cache/metadata.cacher';
import generateTemplate from './template-generator';
import { Request, Response } from 'express';

const workRegex = /\/work\/(.*)/;

let generateFromDb = (titleURL: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        dbService.getPostByTitleURL(titleURL).then((post) => {
            let response = generateTemplate(post);
            metaDataCacher.saveMetaData(post);
            resolve(response);
        }).catch((err) => reject(err));
    });
};

export default function(req: Request, res: Response): void {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    let titleURL = req.url.match(workRegex)[1];
    let response = metaDataCacher.getMetaData(titleURL);
    if (!response) {
        generateFromDb(titleURL)
            .then((data) => res.send(data))
            .catch((err) => res.send(err));
    } else {
        res.send(metaDataCacher.getMetaData(titleURL));
    }
}
