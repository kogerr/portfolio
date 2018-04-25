let storageService = require('../services/storage.service');
let dbService = require('../services/db.service');
let resizeService = require('../services/resize.service');
const directory = 'dist/images/';

exports.returnSavedFileName = function (req, res, next) {
    let response = { name: req.file.filename };
    if (response.name) {
        res.statusCode = 201;
    } else {
        res.statusCode = 404;
    }
    res.send(response);
    dbService.saveImage(req.file.path, req.params.field, req.file.filename);
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

exports.crop = function(req, res) {
    let filePath = directory + req.params.field + '/' + req.params.filename;
    let newName = storageService.generateFilename(req.params.filename);
    let newPath = directory + req.params.field + '/' + newName;
    let proportions = req.body;
    resizeService.crop(filePath, newPath, proportions).then(data => {
        res.statusCode = 200;
        res.send({name: newName});
    }).catch((err) => {
        res.statusCode = 501;
        res.send(err);
    });
};