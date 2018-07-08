import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import * as shortid from 'shortid';
import { Request, Express } from 'express';

const imagesDirectory = 'dist/images/';

let determineDestination = (req: Request, file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void): void => {
    callback(null, imagesDirectory);
};

let determineFilename = (req: Request, file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void): void => {
    let filename = exports.generateFilename(file.originalname);
    callback(null, filename);
};

export let generateFilename = (originalname: string): string => {
    let extension = originalname.substr(originalname.lastIndexOf('.'));
    return shortid.generate() + extension;
};

export let deleteImage = (filename: string): Promise<{ success: boolean }> => {
    let file = path.join(appRoot.path, imagesDirectory) + '/' + filename;
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                reject(err);
            }
            resolve({ success: true });
        });
    });
};

export let storage = multer.diskStorage({
    destination: determineDestination,
    filename: determineFilename,
});
