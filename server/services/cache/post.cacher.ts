import * as dbService from '../db.service';
import Post from '../../models/Post';

let postCache;
fillPostCache();

/**
 * Fills the Post cache with Posts from database on init.
 */
function fillPostCache(): void {
    postCache = new Array<Post>();
    dbService.getPosts().then((data) => {
        data.forEach((post) => savePost(post));
    }).catch((err) => {
        console.log(err);
    });
}

export let savePost = (post: Post): void => {
    postCache.push(post);
};

export let updatePost = (post: Post): void => {
    let postIndex = postCache.findIndex((e) => e.titleURL === post.titleURL);
    postCache[postIndex] = post;
};

export let getPost = (titleURL: string): Post | boolean => {
    let post = postCache.find((e) => e.titleURL === titleURL);
    return post === undefined ? false : post;
};

export let getPosts = (): Array<Post> => {
    return postCache;
};
