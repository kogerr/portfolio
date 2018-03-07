let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');
let multer = require('multer');
let shortid = require('shortid');

const Idlength = 6;
const imagesDirectory = 'dist/images/';

let determineDestination = function (req, file, cb) {
    let destination = imagesDirectory + req.params.field;
    cb(null, destination);
};

let determineFilename = function (req, file, cb) { // TODO: refactor somehow into separate service maybe
    let filename = exports.generateFilename(file.originalname);
    cb(null, filename);
};

exports.generateFilename = function(originalname) {
    let extension = originalname.substr(originalname.lastIndexOf('.'));
    return shortid.generate() + extension;
};

exports.deleteImage = function(imageType, filename) {
    let file = path.join(appRoot.path, imagesDirectory + imageType)  + '/' + filename;
    try {
        fs.unlinkSync(file);
    } catch (err) {
        return err;
    }
    return { status : 'ok' };
};

exports.storage = multer.diskStorage({
    destination: determineDestination,
    filename: determineFilename
});