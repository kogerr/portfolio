let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');

exports.save = function(data) {
    saveLocally(data);
};

saveLocally = function(data) {
    let localFile = path.join(appRoot.path, 'local_storage/data.json');
    fs.readFile(localFile, function(err, file) {
        if (err) {
            console.log(err);
        }
        console.log(JSON.parse(file));
        console.log(data);
        let allData = [ data ].concat(JSON.parse(file));
        console.log(allData);
        fs.writeFile(localFile, JSON.stringify(allData), function(err){});
    });
};