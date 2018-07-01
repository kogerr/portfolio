let template = require('./template.json');

const workBaseURL = 'http://199.247.23.37/work/';
const coverBaseURL = 'http://199.247.23.37/images/cover/';
const titleplaceholder = 'titleplaceholder';
const urlplaceholder = 'urlplaceholder';
const imageplaceholder = /imageplaceholder/g;
const descriptionplaceholder = 'descriptionplaceholder';

exports.assembleResponse = function(post) {
    let title = post.title;
    let description = post.intro;
    let fullImageURL = coverBaseURL + post.cover;
    let fullTitleURL = workBaseURL + post.titleURL;
    let response = template.text
                    .replace(titleplaceholder, title)
                    .replace(urlplaceholder, fullTitleURL)
                    .replace(imageplaceholder, fullImageURL)
                    .replace(descriptionplaceholder, description);
    return response;
};
