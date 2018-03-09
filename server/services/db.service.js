let fs = require('fs');
let mongoose = require('mongoose');
let Post = require('../models/postModel');
let Image = require('../models/imageModel');

exports.savePost = function (post) {
    post._id = post.titleURL;
    let newPost = new Post(post);
    newPost.save((err, data) => {
        if (err) { return err; }
        return data;
    });
};

exports.loadPosts = function (errCB, successCB) {
    Post.find(function (err, docs) {
        if (err) { errCB(err); }
        successCB(docs.sort((a, b) => b.timestamp - a.timestamp));
    });
};

exports.getPostById = function (id, errCB, successCB) {
    Post.findById(id, function (err, data) {
        if (err) { errCB(err); }
        successCB(data);
    });
};

exports.saveImage = function (filePath, imageType, name) {
    fs.readFile(filePath, function (err, data) {
        if (err) { console.error(err); }
        let newImage = new Image({ data: data, imageType: imageType, name: name });
        newImage.save((err, data) => {
            if (err) { console.error(err); }
        });
    });
};