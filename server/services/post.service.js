let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');
let localPostsFilePath = path.join(appRoot.path, 'local_storage/posts.json');

exports.savePost = function (data) {
    savePostLocally(data);
};

savePostLocally = function (post) {
    fs.readFile(localPostsFilePath, function (err, file) {
        if (err) {
            console.log(err);
            return err;
        }
        let allPosts = [post].concat(JSON.parse(file));
        fs.writeFile(localPostsFilePath, JSON.stringify(allPosts), function (err) { });
    });
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