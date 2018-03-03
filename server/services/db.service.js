let mongoose = require('mongoose');
let Post = require('../models/postModel');

exports.savePost = function (req, res) {
    let post = req.body;
    Post.find(function (err, docs) {
        if (err) { res.send(err); }
        let max = Math.max(...docs.map(p => parseInt(p.id)).filter(item => item >= 0));
        console.log(...docs.map(p => parseInt(p.id)));
        if (max >= 0) {
            post.id = max + 1;
        } else {
            post.id = 0;
        }
        let newPost = new Post(post);
        newPost.save((err, p) => {
            if (err) { res.send(err); }
            res.json(p);
        });
    });
};

exports.loadPosts = function (req, res) {
    Post.find(function (err, docs) {
        if (err) { res.send(err); }
        docs = docs.sort((a, b) => b.timestamp - a.timestamp);
        res.json(docs);
    });
};

exports.getPostById = function (req, res) {
    Post.find({ id: req.params.id }, function (err, docs) {
        if (err) { res.send(err); }
        res.json(docs);
    });
};

exports.test = function (data) {
    res.send('OK');
};