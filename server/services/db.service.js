let fs = require('fs');
let mongoose = require('mongoose');
let Post = require('../models/postModel');
// let Image = require('../models/imageModel');

exports.savePost = function (post) {
    let newPost = new Post(post);
    return new Promise(((resolve, reject) => {
        newPost.save((err, data) => {
            if (err) { reject(err); }
            resolve({ 'titleURL': post.titleURL });
        });
    }));
};

exports.updatePost = function (post) {
    return new Promise((resolve, reject) => {
        Post.update({ titleURL: post.titleURL }, post,
            (err, raw) => {
                if (err) {
                    reject(err);
                }
                resolve({ 'titleURL': post.titleURL });
            }
        );
    });
};

exports.loadPosts = function () {
    return new Promise((resolve, reject) => {
        Post.find((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs.sort((a, b) => b.timestamp - a.timestamp));
        });
    });
};

exports.loadPostByTitleURL = function (titleURL) {
    return new Promise((resolve, reject) => {
        Post.findOne(titleURL, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

/*exports.saveImage = function (filePath, imageType, name) {
    fs.readFile(filePath, function (err, data) {
        if (err) { console.error(err); }
        let newImage = new Image({ data: data, imageType: imageType, name: name });
        newImage.save((err, data) => {
            if (err) { console.error(err); }
        });
    });
};*/