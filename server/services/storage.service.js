let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');
let multer = require('multer');
let shortid = require('shortid');

const imagesDirectory = 'dist/images/';

let determineDestination = function (req, file, cb) {
    cb(null, imagesDirectory);
};

let determineFilename = function (req, file, cb) {
    let filename = exports.generateFilename(file.originalname);
    cb(null, filename);
};

exports.generateFilename = function (originalname) {
    let extension = originalname.substr(originalname.lastIndexOf('.'));
    return shortid.generate() + extension;
};

exports.deleteImage = function (filename) {
    let file = path.join(appRoot.path, imagesDirectory) + '/' + filename;
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                reject(err);
            }
            resolve({ status: 'ok' });
        });
    });
};

exports.storage = multer.diskStorage({
    destination: determineDestination,
    filename: determineFilename
});
