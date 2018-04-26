let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');
let localPostsFilePath = path.join(appRoot.path, 'local_storage/posts.json');

/**
 * Not tested at all.
 * Not used. DB Service instead.
 */

exports.savePost = async function (post) {
    let savedPosts = await getPosts();
    return savePostLocally(post, savedPosts);
};

let updatePost = async function (data, titleURL) {
    let savedPosts = await getPosts();
    let postToUpdate = savedPosts.filter(p => p.titleURL == titleURL);
    savedPosts.splice(savedPosts.indexOf(postToUpdate), 1, post);
    return new Promise(((resolve, reject) => {
        fs.writeFile(localPostsFilePath, JSON.stringify(savedPosts), (err) => {
            if (err) { reject(err); }
            resolve({ succes: true });
        });
    }));
};

let savePostLocally = function (post, savedPosts) {
    let allPosts = JSON.stringify([post, ...savedPosts]);
    return new Promise(((resolve, reject) => {
        fs.writeFile(localPostsFilePath, allPosts, (err) => {
            if (err) { reject(err); }
            resolve({ succes: true });
        });
    }));
};

exports.getPosts = function () {
    return new Promise(((resolve, reject) => {
        fs.readFile(localPostsFilePath, allPosts, (err, data) => {
            if (err) { reject(err); }
            resolve(JSON.parse(data));
        });
    }));
};

exports.getPostByTitleURL = function (titleURL) {
    return getPosts().find(post => post.titleURL == titleURL);
};
