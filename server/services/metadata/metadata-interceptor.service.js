let dbService = require('../db.service');
let responseCacher = require('./response-cacher');
let templateGenerator = require('./template-generator');

const workRegex = /\/work\/(.*)/;

let generateFromDb = function (titleURL) {
    return new Promise((resolve, reject) => {
        dbService.getPostByTitleURL(titleURL).then(post => {
            let response = templateGenerator.assembleResponse(post);
            responseCacher.saveResponse(post);
            resolve(response);
        });
    });
}

exports.getResponse = function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    let titleURL = req.url.match(workRegex)[1];
    let response = responseCacher.getResponse(titleURL);
    if (!response) {
        generateFromDb(titleURL).then((data) => { res.send(data); });
    } else {
        res.send(responseCacher.getResponse(titleURL));
    }
};
