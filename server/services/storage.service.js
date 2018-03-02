let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');
let multer = require('multer');

const Idlength = 6;
const imagesDirectory = 'dist/images/';

let determineDestination = function (req, file, cb) {
    let destination = imagesDirectory + req.params.field;
    cb(null, destination);
};

let determineFilename = function (req, file, cb) { // TODO: refactor somehow into separate service maybe
    let extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
    let imageType = req.params.field;
    let filename = imageType.padEnd(Idlength + imageType.length, '0') + extension;
    let items = fs.readdirSync(path.join(appRoot.path, imagesDirectory + imageType));
    if (items.length > 0) {
        let max = Math.max(...items.map((name) => parseInt(name.substr(imageType.length, Idlength))).filter(item => item >= 0));
        if (max >= 0) { // probably unnecessary to check in production
            let id = (max + 1).toString(10).padStart(Idlength, '0');
            filename = imageType + id + extension;
        }
    }

    cb(null, filename);
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