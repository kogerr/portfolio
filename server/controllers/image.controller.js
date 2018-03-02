let storageService = require('../services/storage.service');

exports.returnSavedFileName = function (req, res, next) {
    let response = { name: req.file.filename };
    if (response) {
        res.statusCode = 201;
    } else {
        res.statusCode = 404;
    }
    res.send(response);
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