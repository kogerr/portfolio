import * as postDao from '../../data-access/post.dao';
import generateTemplate from '../metadata/template-generator';
import { Post } from '../../models/frontModels';
import * as logger from '../logger';

let metaDataTemplateCache: Map<string, string>;
fillMetaDataTemplateCache();

/**
 * Fills the template cache with templates generated from database on init.
 */
function fillMetaDataTemplateCache(): void {
    metaDataTemplateCache = new Map<string, string>();
    postDao.getPosts().then((data) => {
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

export function update(): void {
    fillMetaDataTemplateCache();
}
