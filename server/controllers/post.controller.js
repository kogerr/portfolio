let dbService = require('../services/db.service');
let responseCacher = require('../services/cache/metadata.cacher');
let postCacher = require('../services/cache/post.cacher');

exports.savePost = function (req, res) {
    dbService.savePost(req.body)
        .then((data) => {
            res.statusCode = 201;
            res.send({ success: true });
            responseCacher.saveMetaData(req.body);
            postCacher.savePost(req.body);
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
            responseCacher.updateMetaData(req.body);
            postCacher.updatePost(req.body);
        }).catch((err) => {
            res.statusCode = 500;
            res.send(err);
        });
};

exports.getPosts = function (req, res) {
    let cachedPosts = postCacher.getPosts();
    if (cachedPosts.length) {
        res.statusCode = 200;
        res.send(cachedPosts);
    } else {
        dbService.getPosts()
            .then((data) => {
                res.statusCode = 200;
                res.send(data);
            }).catch((err) => {
                res.statusCode = 404;
                res.send(err);
            });
    }
};

exports.getPostByTitleURL = function (req, res) {
    let cachedPost = postCacher.getPost({ titleURL: req.params.titleURL });
    if (cachedPost) {
        res.statusCode = 200;
        res.send(cachedPost);
    } else {
        dbService.getPostByTitleURL(req.params.titleURL)
            .then((data) => {
                res.statusCode = 200;
                res.send(data);
            }).catch((err) => {
                res.statusCode = 404;
                res.send(err);
            });
    }
};

exports.checkPost = function (req, res) {
    res.statusCode = 200;
    dbService.getPostByTitleURL(req.params.titleURL)
        .then((data) => {
            res.send({ found: (data !== null) });
        }).catch((err) => {
            res.send({ found: false });
        });
};

exports.getPreviousPostTitleUrl = function (req, res) {
    dbService.getPreviousPostTitleUrl(req.params.titleURL)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            res.statusCode = 404;
            res.send(err);
        });
};

exports.getNextPostTitleUrl = function (req, res) {
    dbService.getNextPostTitleUrl(req.params.titleURL)
        .then((data) => {
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            res.statusCode = 404;
            res.send(err);
        });
};

exports.saveMetaData = function (req, res) {
    responseCacher.saveMetaData(req.body);
    res.statusCode = 200;
    res.send(responseCacher.getMetaData(req.body.titleURL));
};

exports.cacherTest = function (req, res) {
    console.time('cache');
    let cachedPosts = postCacher.getPosts();
    console.timeEnd('cache');
    console.time('db');
    dbService.getPosts()
        .then((data) => {
            console.timeEnd('db');
            res.statusCode = 200;
            res.send(data);
        }).catch((err) => {
            res.statusCode = 404;
            res.send(err);
        });
}
