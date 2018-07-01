let dbService = require('../db.service');

let postCache;
fillPostCache();

function fillPostCache() {
    postCache = [];
    dbService.getPosts().then((data) => {
        data.forEach(post => exports.savePost(post));
    }).catch((err) => {
        console.log(err);
    });
}

exports.savePost = function (post) {
    postCache.push(post);
};

exports.updatePost = function (post) {
    let postIndex = postCache.findIndex((e) => e.titleURL === post.titleURL);
    postCache[postIndex] = post;
};

exports.getPost = function (titleURL) {
    let post = postCache.find((e) => e.titleURL === titleURL);
    return post === undefined ? false : post;
}

exports.getPosts = function () {
    return postCache;
}

exports.fillPostCache = fillPostCache;
