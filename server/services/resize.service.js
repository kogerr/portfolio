let Jimp = require("jimp");
let storageService = require('../services/storage.service');
const directory = 'dist/images/';

exports.crop = function (req, res) {
    let filePath = directory + req.params.field + '/' + req.params.filename;
    let newName = storageService.generateFilename(req.params.filename);
    let newPath = directory + req.params.field + '/' + newName;
    return Jimp.read(filePath, function (err, image) {
        let newSize = calculateSize(image.bitmap.width, image.bitmap.height);
        if (err) {
            res.status = 404;
            res.send(err);
        }
        image.cover(newSize.width, newSize.height).write(newPath, function () {
            res.status = 201;
            res.send({ name: newName });
        });
    });
};

calculateSize = function (width, height) {
    if (width / 9 * 5 > height) {
        return { width: width, height: width / 9 * 5 };
    } else {
        return { width: height / 5 * 9, height: height };
    }
};