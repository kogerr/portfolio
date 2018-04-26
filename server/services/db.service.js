let mongoose = require('mongoose');
let Post = require('../models/postModel');
let Slide = require('../models/slideModel');

exports.savePost = function (post) {
    let newPost = new Post(post);
    return newPost.save();
};

exports.updatePost = function (post) {
    return new Promise((resolve, reject) => {
        Post.update({ titleURL: post.titleURL }, post,
            (err, raw) => {
                if (err) {
                    reject(err);
                }
                resolve({ titleURL: raw.titleURL });
            }
        );
    });
};

exports.getPosts = function () {
    return new Promise((resolve, reject) => {
        Post.find((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs.sort((a, b) => b.timestamp - a.timestamp));
        });
    });
};

exports.getPostByTitleURL = function (titleURL) {
    return new Promise((resolve, reject) => {
        Post.findOne({ titleURL: titleURL }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

exports.getSlides = function () {
    return new Promise((resolve, reject) => {
        Slide.find((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        });
    });
};

exports.saveSlide = function (slide) {
    let newSlide = new Slide(slide);
    return newSlide.save();
};
