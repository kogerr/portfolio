let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');

const coverDirectory = path.join(appRoot.path, 'dist/images/covers/');

exports.saveCoverImage = function (buffer, extension) {
    let name = findName(extension);
    saveCoverImageLocally(buffer, name);
    return { 'name': name };
};

saveCoverImageLocally = function (buffer, name) {
    let localFile = coverDirectory + name;
    fs.writeFile(localFile, buffer, 'binary', function (err) { if (err) console.log(err); });
};

findName = function (extension) {
    let Idlength = 6;
    let items = fs.readdirSync(coverDirectory);
    let max = Math.max(...items.map((name) => parseInt(name.substr(5, Idlength))));
    if (max >= 0) { // probably unnecessary to check in production
        let id = (max + 1).toString(10).padStart(Idlength, '0');
        return 'cover' + id + extension;
    } else {
        return 'cover000000'  + extension;
    }
};