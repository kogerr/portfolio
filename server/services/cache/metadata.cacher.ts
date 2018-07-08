import * as dbService from '../db.service';
import generateTemplate from '../metadata/template-generator';
import Post from '../../models/Post';

let metaDataTemplateCache: Map<string, string>;
fillMetaDataTemplateCache();

/**
 * Fills the template cache with templates generated from database on init.
 */
function fillMetaDataTemplateCache(): void {
    metaDataTemplateCache = new Map<string, string>();
    dbService.getPosts().then((data) => {
        data.forEach((post) => saveMetaData(post));
    }).catch((err) => {
        console.log(err);
    });
}

export let saveMetaData = (post: Post): void => {
    let metaDataTemplate = generateTemplate(post);
    metaDataTemplateCache.set(post.titleURL, metaDataTemplate);
};

export let getMetaData = (titleURL: string): string | boolean => {
    let template = metaDataTemplateCache.get(titleURL);
    return template === undefined ? false : template;
};
