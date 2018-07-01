let storageService = require('../services/storage.service');
let resizeService = require('../services/resize.service');
const directory = 'dist/images/';

exports.returnSavedFileName = function (req, res) {
    let response = { name: req.file.filename };
    if (response.name) {
        res.statusCode = 201;
    } else {
        res.statusCode = 404;
    }
    res.send(response);
};

exports.deleteImage = function (req, res) {
    storageService.deleteImage(req.params.filename)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
        }).catch((err) => {
            res.statusCode = 404;
            res.send(err);
        });
};

exports.crop = function (req, res) {
    let filePath = directory + '/' + req.params.filename;
    let newName = storageService.generateFilename(req.params.filename);
    let newPath = directory + '/' + newName;
    let proportions = req.body;
    resizeService.crop(filePath, newPath, proportions).then(() => {
        res.statusCode = 200;
        res.send({ name: newName });
    }).catch((err) => {
        res.statusCode = 501;
        res.send(err);
    });
};
