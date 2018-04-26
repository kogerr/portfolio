let dbService = require('../services/db.service');

exports.savePost = function (req, res) {
    dbService.savePost(req.body)
        .then((data) => {
            res.statusCode = 201;
            res.send({ success: true });
        }).catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
};

exports.updatePost = function (req, res) {
    dbService.updatePost(req.body)
        .then((data) => {
            res.statusCode = 200;
            res.send({ success: true });
        }).catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
};

exports.getPosts = function (req, res) {
    dbService.getPosts()
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            res.statusCode = 404;
            res.send(err);
        });
};

exports.getPostByTitleURL = function (req, res) {
    dbService.getPostByTitleURL(req.params.titleURL)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            res.statusCode = 404;
            res.send(err);
        });
};

exports.checkPost = function (req, res) {
    res.statusCode = 200;
    dbService.getPostByTitleURL(req.params.titleURL)
        .then((data) => {
            res.send({ found: true });
        }).catch((err) => {
            res.send({ found: false });
        });
};
