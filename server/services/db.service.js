let Post = require('../models/postModel');
let Slide = require('../models/slideModel');
let About = require('../models/aboutModel');
let User = require('../models/userModel');

/**
 * Deletes the _id from documents before letting them out.
 * @param {*} doc document read from database
 * @return {*} document without id
 */
function deleteID(doc) {
    let response = doc.toObject();
    delete response['_id'];
    return response;
}

exports.savePost = function(post) {
    let newPost = new Post(post);
    return newPost.save();
};

exports.updatePost = function(post) {
    return new Promise((resolve, reject) => {
        Post.update({titleURL: post.titleURL}, post,
            (err, raw) => {
                if (err) {
                    reject(err);
                }
                resolve({titleURL: raw.titleURL});
            }
        );
    });
};

exports.getPosts = function() {
    return new Promise((resolve, reject) => {
        Post.find((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs.sort((a, b) => b.timestamp - a.timestamp)
                .map((post) => deleteID(post)));
        });
    });
};

exports.getPostByTitleURL = function(titleURL) {
    return new Promise((resolve, reject) => {
        Post.findOne({titleURL: titleURL}, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(deleteID(data));
        });
    });
};

exports.getPreviousPostTitleUrl = function(titleURL) {
    return new Promise((resolve, reject) => {
        Post.find((err, docs) => {
            if (err) {
                reject(err);
            }
            let postsSorted = docs.sort((a, b) => b.timestamp - a.timestamp);
            let i = postsSorted.findIndex((e) => e.titleURL === titleURL) + 1;
            let targetPost = postsSorted[i];
            if (!targetPost) {
                targetPost = postsSorted[0];
            }
            resolve({titleURL: targetPost.titleURL});
        });
    });
};

exports.getNextPostTitleUrl = function(titleURL) {
    return new Promise((resolve, reject) => {
        Post.find((err, docs) => {
            if (err) {
                reject(err);
            }
            let postsSorted = docs.sort((a, b) => b.timestamp - a.timestamp);
            let i = postsSorted.findIndex((e) => e.titleURL === titleURL) - 1;
            let targetPost = postsSorted[i];
            if (!targetPost) {
                targetPost = postsSorted[postsSorted.length - 1];
            }
            resolve({titleURL: targetPost.titleURL});
        });
    });
};

exports.getSlides = function() {
    return new Promise((resolve, reject) => {
        Slide.find((err, docs) => {
            if (err) {
                reject(err);
            }
            docs.map((slide) => deleteID(slide));
            resolve(docs);
        });
    });
};

exports.saveSlide = function(slide) {
    let newSlide = new Slide(slide);
    return newSlide.save();
};

exports.getAbout = function() {
    return new Promise((resolve, reject) => {
        About.findOne((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(deleteID(docs));
        });
    });
};

exports.updateAbout = function(about) {
    return new Promise((resolve, reject) => {
        About.update({}, about,
            (err, raw) => {
                if (err) {
                    reject(err);
                }
                resolve({data: raw});
            }
        );
    });
};

exports.checkUser = function(email, password) {
    return new Promise((resolve, reject) => {
        User.find({email, password}, (err, docs) => {
            if (err) {
                reject(err);
            }
            if (docs.length) {
                resolve({found: true});
            } else {
                resolve({found: false});
            }
        });
    });
};
