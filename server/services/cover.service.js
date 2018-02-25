let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');

const coverDirectory = path.join(appRoot.path, 'local_storage/images/covers/');

exports.saveCoverImage = function (buffer, extension) {
    let name = findName(extension);
    saveCoverImageLocally(buffer, name);
    return { 'name' : name};
};

saveCoverImageLocally = function (buffer, name) {
    let localFile = coverDirectory + name;
    fs.writeFile(localFile, buffer, 'binary', function (err) { if(err) console.log(err);});
};

findName = function (extension) {
    let Idlength = 6;
    let max = 0;
    let items = fs.readdirSync(coverDirectory);
    console.log(items);

    for (var i = 0; i < items.length; i++) {
        let imageNumber = parseInt(items[i].substr(5, Idlength));
        if (imageNumber > max) {
            max = imageNumber;
        }
    }
    let id = (max + 1).toString(10).padStart(Idlength, '0');
    return 'cover' + id + extension;
};