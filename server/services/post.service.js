let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');
let localPostsFilePath = path.join(appRoot.path, 'local_storage/posts.json');

exports.savePost = function (data) {
    return savePostLocally(data);
};

savePostLocally = function (post) {
    let file;
    try {
        file = fs.readFileSync(localPostsFilePath);
    } catch (err) {
        return err;
    }
    let posts = JSON.parse(file);
    let max = Math.max(...posts.filter((item) => (typeof item.id === 'number')).map(item => item.id));
    let id = (max >= 0) ? (max + 1) : 0;
    post.id = id;
    let allPosts = [post].concat(JSON.parse(file));
    try {
        fs.writeFileSync(localPostsFilePath, JSON.stringify(allPosts));
    } catch (err) {
        return err;
    }
    return { 'id': id };
};

exports.loadPosts = function (from, to) {
    let file;
    try {
        file = fs.readFileSync(localPostsFilePath);
    } catch (err) {
        return err;
    }
    let allPosts = JSON.parse(file);
    if (from && to) {
        return allPosts.slice(from, to);
    } else {
        return allPosts;
    }
};

exports.loadPostById = function (id) {
    return exports.loadPosts().filter(post => post.id == id)[0];
};