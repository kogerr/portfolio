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
    dbService.savePost(data);
    return savePostLocally(data, savedPosts);
};

exports.updatePost = function (data, titleURL) {
    let savedPosts;
    try {
        savedPosts = JSON.parse(fs.readFileSync(localPostsFilePath));
    } catch (err) {
        return err;
    }
    dbService.savePost(data);
    return updatePostLocally(data, savedPosts, titleURL);
};

savePostLocally = function (post, savedPosts) {
    let allPosts = [post, ...savedPosts];
    try {
        fs.writeFileSync(localPostsFilePath, JSON.stringify(allPosts));
    } catch (err) {
        return err;
    }
    return { 'titleURL': post.titleURL };
};

updatePostLocally = function (post, savedPosts, titleURL) {
    let postToUpdate = savedPosts.filter(p => p.titleURL == titleURL);
    savedPosts.splice(savedPosts.indexOf(postToUpdate), 1, post);
    try {
        fs.writeFileSync(localPostsFilePath, JSON.stringify(savedPosts));
    } catch (err) {
        return err;
    }
    return { 'titleURL': post.titleURL };
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

exports.loadPostByTitleURL = function (titleURL) {
    return exports.loadPosts().find(post => post.titleURL == titleURL);
};