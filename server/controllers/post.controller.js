let persistenceService = require('../services/persistence.service');

exports.create = function(req, res) {
    console.log(req.body.title);
    persistenceService.save(req.body);
    res.statusCode = 414;
    res.send(req.body);
};

exports.test = function(req, res) {
    res.statusCode = 200;
    res.send('all righty then!');
};