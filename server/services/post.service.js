let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');
let localPostsFilePath = path.join(appRoot.path, 'local_storage/posts.json');
let dbService = require('../services/db.service');

exports.savePost = function (data) {
    let savedPosts;
    try {
        savedPosts = JSON.parse(fs.readFileSync(localPostsFilePath));
    } catch (err) {
        return err;
    }
    let id = findPostId(savedPosts);
    data.id = id;
    dbService.savePost(data);
    return savePostLocally(data, savedPosts);
};

savePostLocally = function (post, savedPosts) {
    let allPosts = [post].concat(savedPosts);
    try {
        fs.writeFileSync(localPostsFilePath, JSON.stringify(allPosts));
    } catch (err) {
        return err;
    }
    return { 'id': post.id };
};

findPostId = function(savedPosts) {
    let max = Math.max(...savedPosts.filter((item) => (typeof item.id === 'number')).map(item => item.id));
    let id = (max >= 0) ? (max + 1) : 0;
    return id;
};

exports.loadPosts = function (from, to) {
    let file;
    try {
        file = fs.readFileSync(localPostsFilePath);
    } catch (err) {
        return err;
    }
    let allPosts = JSON.parse(file);
    if (from && to) {
        return allPosts.slice(from, to);
    } else {
        return allPosts;
    }
};

exports.loadPostById = function (id) {
    return exports.loadPosts().filter(post => post.id == id)[0];
};