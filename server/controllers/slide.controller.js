let dbService = require('../services/db.service');

exports.getSlides = function (req, res) {
    dbService.getSlides()
        .then(data => {
            res.statusCode = 200;
            res.send(data);
        }).catch(error => {
            res.statusCode = 404;
            res.send(error);
        });
};

exports.saveSlide = function (req, res) {
    dbService.saveSlide(req.body)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
        }).catch(error => {
            res.statusCode = 500;
            res.send(error);
        });
};
