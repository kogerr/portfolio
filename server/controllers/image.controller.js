let storageService = require('../services/storage.service');
let dbService = require('../services/db.service');
let resizeService = require('../services/resize.service');

exports.returnSavedFileName = function (req, res, next) {
    dbService.saveImage(req.file.path, req.params.field, req.file.filename);
    let response = { name: req.file.filename };
    if (response.name) {
        res.statusCode = 201;
    } else {
        res.statusCode = 404;
    }
    resizeService.crop(req.file.path, () => res.send(response));
};

exports.deleteImage = function (req, res, next) {
    let response = storageService.deleteImage(req.params.field, req.params.filename);
    if (response.errno) {
        res.statusCode = 404;
    } else {
        res.statusCode = 200;
    }
    res.send(response);
};