let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');

exports.savePost = function(data) {
    savePostLocally(data);
};

savePostLocally = function(data) {
    let localFile = path.join(appRoot.path, 'local_storage/data.json');
    fs.readFile(localFile, function(err, file) {
        if (err) {
            console.log(err);
        }
        let allData = [ data ].concat(JSON.parse(file));
        fs.writeFile(localFile, JSON.stringify(allData), function(err){});
    });
};