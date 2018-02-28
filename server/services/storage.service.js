let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');
let multer = require('multer');

const fieldMap = {
    'cover-image': { destination: 'dist/images/covers/', prefix: 'cover' },
    'content-image': { destination: 'dist/images/content/', prefix: 'content' }
};

const Idlength = 6;

let determineDestination = function (req, file, cb) {
    let destination = fieldMap[file.fieldname].destination;
    cb(null, destination);
};

let determineFilename = function (req, file, cb) { // TODO: refactor somehow into separate service maybe
    let extension = file.originalname.substr(file.originalname.lastIndexOf('.'));
    let prefix = fieldMap[file.fieldname].prefix;
    let filename = prefix + '000000' + extension;
    let items = fs.readdirSync(path.join(appRoot.path, fieldMap[file.fieldname].destination));
    if (items.length > 0) {
        let max = Math.max(...items.map((name) => parseInt(name.substr(prefix.length, Idlength))).filter(item => item >= 0));
        if (max >= 0) { // probably unnecessary to check in production
            let id = (max + 1).toString(10).padStart(Idlength, '0');
            filename = prefix + id + extension;
        }
    }

    cb(null, filename);
};

exports.storage = multer.diskStorage({
    destination: determineDestination,
    filename: determineFilename
});