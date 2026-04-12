/* tslint:disable:no-eval */
/* tslint:disable:no-unused-variable */

import * as fs from 'fs';
import { Post } from '../../models/frontModels';
import * as logger from '../logger';

const workBaseURL = 'https://botondvoros.com/work/';
const imagesBaseURL = 'https://botondvoros.com/images/';
let templateText: string;

fs.readFile('./server/services/metadata/template.json', (err, data) => {
    if (err) {
        logger.error(err);
    } else {
        templateText = JSON.parse(data.toString()).text;
    }
});

export default function(post: Post): string {
    const title = post.title;
    const description = post.facebookDescription;
    const fullImageURL = imagesBaseURL + post.facebookImage;
    const fullTitleURL = workBaseURL + post.titleURL;
    const metaDatatemplate = eval(templateText);
    return metaDatatemplate;
}
