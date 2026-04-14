import * as appRoot from 'app-root-path';
import * as fs from 'fs';
import * as path from 'path';
import * as multer from 'multer';
import * as shortid from 'shortid';
import { Request, Express } from 'express';

const imagesDirectory = 'images/';

function determineDestination(req: Request, file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void): void {
    callback(null, imagesDirectory);
}

function determineFilename(req: Request, file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void): void {
    const filename = exports.generateFilename(file.originalname);
    callback(null, filename);
}

export function generateFilename(originalname: string): string {
    const extension = originalname.substr(originalname.lastIndexOf('.'));
    return shortid.generate() + extension;
}

export function deleteImage(filename: string): Promise<{ success: boolean }> {
    const sanitized = path.basename(filename);
    const file = path.join(appRoot.path, imagesDirectory, sanitized);
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                return reject(err);
            }
            resolve({ success: true });
        });
    });
}

export const storage: multer.StorageEngine = multer.diskStorage({
    destination: determineDestination,
    filename: determineFilename,
});
