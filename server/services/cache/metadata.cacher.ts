import * as dbService from '../db.service';
import generateTemplate from '../metadata/template-generator';
import Post from '../../models/Post';
import * as logger from '../logger';

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
        logger.error(err);
    });
}

export function saveMetaData(post: Post): void {
    let metaDataTemplate = generateTemplate(post);
    metaDataTemplateCache.set(post.titleURL, metaDataTemplate);
}

export function getMetaData(titleURL: string): string | boolean {
    let template = metaDataTemplateCache.get(titleURL);
    return template === undefined ? false : template;
}
