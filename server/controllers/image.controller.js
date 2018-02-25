let coverService = require('../services/cover.service');

exports.saveCover = function (req, res, next) {
    console.log(req.file.originalname);
    let extension = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
    let response = coverService.saveCoverImage(req.file.buffer, extension);
    res.statusCode = 200;
    res.send(response);
};

exports.test = function (req, res) {
    res.statusCode = 200;
    res.send('all righty imageController');
};