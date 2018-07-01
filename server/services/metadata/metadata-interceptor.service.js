let dbService = require('../db.service');
let metaDataCacher = require('../cache/metadata.cacher');
let templateGenerator = require('./template-generator');

const workRegex = /\/work\/(.*)/;

let generateFromDb = function (titleURL) {
    return new Promise((resolve, reject) => {
        dbService.getPostByTitleURL(titleURL).then(post => {
            let response = templateGenerator.assembleTemplate(post);
            metaDataCacher.saveMetaData(post);
            resolve(response);
        });
    });
}

exports.getResponse = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    let titleURL = req.url.match(workRegex)[1];
    let response = metaDataCacher.getMetaData(titleURL);
    if (!response) {
        generateFromDb(titleURL).then((data) => { res.send(data); });
    } else {
        res.send(metaDataCacher.getMetaData(titleURL));
    }
};
