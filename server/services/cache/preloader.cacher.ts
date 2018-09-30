import * as postDao from '../../data-access/post.dao';
import * as logger from '../logger';
import { ContentType, ContentImage } from '../../../src/app/models/post';

let preloaderCache: Array<string>;
update();

/**
 * Fills the About cache with About from database.
 */
export function update(): void {
    postDao.getPosts().then(posts => {
        let coverImages = posts.map(p => p.cover);
        let contentImages = posts.map(p => p.contents.filter(c => c.type === ContentType.image)[0])
            .filter(x => x).map(i => (i as ContentImage).name);
        preloaderCache = [...coverImages, ...contentImages];
    }).catch((err) => {
        logger.error(err);
    });
}

export function getImages(): Array<string> {
    return preloaderCache;
}
