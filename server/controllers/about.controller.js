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