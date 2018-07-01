let template = require('./template.json');

const workBaseURL = 'http://199.247.23.37/work/';
const coverBaseURL = 'http://199.247.23.37/images/cover/';

exports.assembleResponse = function(post) {
    let title = post.title;
    let description = post.intro;
    let fullImageURL = coverBaseURL + post.cover;
    let fullTitleURL = workBaseURL + post.titleURL;
    let response = eval(template.text);
    return response;
};
