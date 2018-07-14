import * as dbService from '../db.service';
import Post from '../../models/Post';
import * as logger from '../logger';

let postCache: Array<Post>;
fillPostCache();

/**
 * Fills the Post cache with Posts from database on init.
 */
function fillPostCache(): void {
    postCache = new Array<Post>();
    dbService.getPosts().then((data) => {
        data.forEach((post) => savePost(post));
    }).catch((err) => {
        logger.error(err);
    });
}

export function savePost(post: Post): void {
    postCache.push(post);
}

export function updatePost(post: Post): void {
    let postIndex = postCache.findIndex((e) => e.titleURL === post.titleURL);
    postCache[postIndex] = post;
}

export function getPost(titleURL: string): Post | boolean {
    let post = postCache.find((e) => e.titleURL === titleURL);
    return post === undefined ? false : post;
}

export function getPosts(): Array<Post> {
    return postCache;
}

export function update(): void {
    fillPostCache();
}
