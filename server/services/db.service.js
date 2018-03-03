let fs = require('fs');
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

exports.saveImage = function (req, res) {
    let newImage = new Image();
    newImage.data = fs.readFileSync(req.file.path);
    newImage.imageType = req.params.field;
    newImage.name = req.file.filename;
    newImage.save((err, data) => {
        if (err) { res.send(err); }
        res.statusCode = 201;
        res.send({ name: req.file.filename });
    });
};