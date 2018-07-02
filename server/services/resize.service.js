let Jimp = require('jimp');

exports.crop = function(filePath, newPath, proportions) {
    return new Promise((resolve, reject) => {
        Jimp.read(filePath, (err, image) => {
            if (err) {
                reject(err);
            }
            let width = image.bitmap.width;
            let height = image.bitmap.height;
            let newSize = calculateSize(width, height, proportions);
            image.cover(newSize.width, newSize.height).write(newPath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve({status: 'ok'});
            });
        });
    });
};

let calculateSize = function(width, height, proportions) {
    if (width / proportions.w * proportions.h < height) {
        return {width: width, height: width / proportions.w * proportions.h};
    } else {
        return {width: height / proportions.h * proportions.w, height: height};
    }
};
