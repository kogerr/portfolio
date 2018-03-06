let Jimp = require("jimp");
const directory = 'dist/images/content/';

exports.crop = function (filePath, cb) {
    return Jimp.read(filePath, function (err, image) {
        let newSize = calculateSize(image.bitmap.width, image.bitmap.height);
        if (err) throw err;
        image.cover(newSize.width, newSize.height).write(filePath, cb);
    });
};

calculateSize = function (width, height) {
    if (width / 9 * 5 > height) {
        return { width: width, height: width / 9 * 5 };
    } else {
        return { width: height / 5 * 9, height: height };
    }
};