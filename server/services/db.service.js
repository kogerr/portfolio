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

exports.loadPosts = function () {
    Post.find(function (err, docs) {
        if (err) { return err; }
        return docs.sort((a, b) => b.timestamp - a.timestamp).map(p.titleURL = p._id);
    });
};

exports.getPostById = function (id) {
    Post.findById(id, function (err, docs) {
        if (err) { return err; }
        return docs;
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