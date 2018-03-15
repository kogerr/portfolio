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

exports.updatePost = function (req, res) {
    let result = postService.updatePost(req.body, req.params.titleURL);
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
    if (post) {
        res.statusCode = 200;
        res.send(post);
    } else {
        res.statusCode = 404;
        res.send({ error: 'Post not found' });
    }
};

exports.checkPost = function (req, res) {
    let post = postService.loadPostByTitleURL(req.params.titleURL);
    res.statusCode = 200;
    if (post) {
        res.send({ found: true });
    } else {
        res.send({ found: false });
    }
};

exports.test = function (req, res) {
    res.statusCode = 200;
    res.send('all righty then!');
};