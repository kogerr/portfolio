let dbService = require('../services/db.service');

exports.getAbout = function (req, res) {
    dbService.getAbout()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            res.statusCode = 404;
            res.send(err);
        });
};

exports.updateAbout = function (req, res) {
    dbService.updateAbout(req.body)
        .then(() => {
            res.statusCode = 200;
            res.send({ success: true });
        }).catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
};
