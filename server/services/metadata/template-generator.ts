/* tslint:disable:no-eval */
/* tslint:disable:no-unused-variable */

import * as fs from 'fs';
import Post from '../../models/Post';

const workBaseURL = 'http://199.247.23.37/work/';
const imagesBaseURL = 'http://199.247.23.37/images/';
let templateText: string;

fs.readFile('./server/services/metadata/template.json', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        templateText = JSON.parse(data.toString()).text;
    }
});

export default function(post: Post): string {
    let title = post.title;
    let description = post.facebookDescription;
    let fullImageURL = imagesBaseURL + post.facebookImage;
    let fullTitleURL = workBaseURL + post.titleURL;
    let metaDatatemplate = eval(templateText);
    return metaDatatemplate;
}
