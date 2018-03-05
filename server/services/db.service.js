let fs = require('fs');
let mongoose = require('mongoose');
let Post = require('../models/postModel');
let Image = require('../models/imageModel');

exports.savePost = function (post) {
    post._id = post.id;
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
    Post.findById( id , function (err, docs) {
        if (err) { return err; }
        return docs;
    });
};

exports.saveImage = function (req, res) {
    let newImage = new Image();
    res.statusCode = 201;
    res.send({ name: req.file.filename });
    newImage.data = fs.readFileSync(req.file.path);
    newImage.imageType = req.params.field;
    newImage.name = req.file.filename;
    newImage.save((err, data) => {
        if (err) { console.error(err); }
    });
};