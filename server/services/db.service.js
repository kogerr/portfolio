let mongoose = require('mongoose');
let Post = require('../models/postModel');
let Image = require('../models/imageModel');

exports.savePost = function (post) {
    let newPost = new Post(post);
    newPost.save((err, data) => {
        if (err) { return err; }
        return data;
    });
};

exports.loadPosts = function () {
    Post.find(function (err, docs) {
        if (err) { return err; }
        return docs.sort((a, b) => b.timestamp - a.timestamp);
    });
};

exports.getPostById = function (id) {
    Post.find({ 'id': id }, function (err, docs) {
        if (err) { return err; }
        return docs;
    });
};

exports.saveImage = function (file, name, imageType) {
    let img = { data: file, name: name, imageType: imageType };
    let newImage = new Image(img);
    newImage.save((err, data) => {
        if (err) { return err; }
        return data;
    });
};