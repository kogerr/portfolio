let storageService = require('../services/storage.service');
let dbService = require('../services/db.service');

exports.returnSavedFileName = function (req, res, next) {
    console.log(req.file.path);
    //dbService.saveImage(req.file.buffer, req.file.filename, req.params.field);
    let response = { name: req.file.filename };
    if (response.name) {
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