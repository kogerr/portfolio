/* eslint no-unused-vars: 'off' */

let template = require('./template.json');

const workBaseURL = 'http://199.247.23.37/work/';
const imagesBaseURL = 'http://199.247.23.37/images/';

exports.assembleTemplate = function(post) {
    let title = post.title;
    let description = post.facebookDescription;
    let fullImageURL = imagesBaseURL + post.facebookImage;
    let fullTitleURL = workBaseURL + post.titleURL;
    let metaDatatemplate = eval(template.text);
    return metaDatatemplate;
};
