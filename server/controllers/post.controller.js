let postService = require('../services/post.service');

exports.savePost = function (req, res) {
    let result = postService.savePost(req.body);
    if (result.errno) {
        res.statusCode = 418;
    } else {
        res.statusCode = 200;
    }
    res.send(result); // maybe change in production
};

exports.getPosts = function (req, res) {
    let posts = postService.loadPosts(req.query.from, req.query.to);
    if (posts.errno) {
        res.statusCode = 418;
    } else {
        res.statusCode = 200;
    }
    res.send(posts);
};

exports.getPostByTitleURL = function (req, res) {
    let post = postService.loadPostByTitleURL(req.params.titleURL);
    if (post.errno) {
        res.statusCode = 418;
    } else {
        res.statusCode = 200;
    }
    res.send(post);
};

exports.test = function (req, res) {
    res.statusCode = 200;
    res.send('all righty then!');
};