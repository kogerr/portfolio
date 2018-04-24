let appRoot = require('app-root-path');
let fs = require('fs');
let path = require('path');
let localSlidesFilePath = path.join(appRoot.path, 'local_storage/slides.json');

function loadSlides() {
    return new Promise(function (resolve, reject) {
        fs.readFile(localSlidesFilePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

exports.loadSlides = loadSlides;