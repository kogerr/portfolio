let dbService = require('../services/db.service');

exports.loadPosts = function (req, res) {
    dbService.loadPosts(function(err){
        res.statusCode = 404;
        res.json(err);
    }, function(data){
        res.statusCode = 200;
        res.json(data);
    });    
};

exports.getPostById = function (req, res) {
    dbService.getPostById(req.params.id, function(err){
        res.statusCode = 404;
        res.json(err);
    }, function(data){
        res.statusCode = 200;
        res.json(data);
    });    
};