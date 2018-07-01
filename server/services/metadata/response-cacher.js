let dbService = require('../db.service');
let templateGenerator = require('./template-generator');

let responseMap = [];
fillResponseMap();

function fillResponseMap() {
    dbService.getPosts().then((data) => {
        data.forEach(post => exports.saveResponse(post));
    }).catch((err) => {
        console.log(err);
    });
}

exports.saveResponse = function (post) {
    let response = templateGenerator.assembleResponse(post);
    responseMap.push({ titleURL: post.titleURL, response: response });
};

exports.getResponse = function (titleURL) {
    let responseObject = responseMap.find((e) => e.titleURL == titleURL);
    return responseObject === undefined ? false : responseObject.response;
}
