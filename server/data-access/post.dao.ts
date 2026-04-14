import PostModel, { PostDocument } from '../models/postModel';
import { Post } from '../models/frontModels';
import * as logger from '../services/logger';
import { castMongoosePromise, deleteID, sortByIndex, UpdateResponse } from './dao_utils';

export function savePost(post: Post): Promise<PostDocument> {
    return new Promise((resolve, reject) => {
        PostModel.count({}, (err, count) => {
            if (err) {
                logger.error(err);
            } else {
                post.index = count;
            }
            const newPost = new PostModel(post);
            newPost.save((error, product) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(deleteID(product));
                }
            });
        });
    });
}

export function updatePost(post: Post): Promise<{ titleURL: string }> {
    return new Promise((resolve, reject) => {
        PostModel.update({ titleURL: post.titleURL }, post,
            (err, raw) => {
                if (err) {
                    return reject(err);
                }
                resolve({ titleURL: raw.titleURL });
            }
        );
    });
}

export function updateIndices(indexPairs: { index: number, titleURL: string }[]): Promise<Array<UpdateResponse>> {
    const promises = new Array<Promise<UpdateResponse>>();
    indexPairs.forEach(e => {
        promises.push(
            castMongoosePromise(PostModel.update({ titleURL: e.titleURL }, { index: e.index }).exec())
        );
    });
    return Promise.all(promises);
}

export function getPosts(): Promise<Array<PostDocument>> {
    return new Promise((resolve, reject) => {
        PostModel.find((err, docs) => {
            if (err) {
                return reject(err);
            }
            resolve(sortByIndex(docs.map((post) => deleteID(post))));
        });
    });
}

export function getPostByTitleURL(titleURL: string): Promise<PostDocument> {
    return new Promise((resolve, reject) => {
        PostModel.findOne({ titleURL }, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(deleteID(data));
        });
    });
}

export function deletePostByTitleURL(titleURL: string): Promise<{ deleted: boolean }> {
    return new Promise((resolve, reject) => {
        PostModel.deleteOne({ titleURL }, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ deleted: true });
            }
        });
    });
}

export function checkPostByTitleURL(titleURL: string): Promise<{ found: boolean }> {
    return new Promise((resolve, reject) => {
        PostModel.findOne({ titleURL }, (err, data) => {
            if (err || !data) {
                resolve({ found: false });
            } else {
                resolve({ found: true });
            }
        });
    });
}

export function getPreviousPostTitleUrl(titleURL: string): Promise<{ titleURL: string }> {
    return new Promise((resolve, reject) => {
        PostModel.find((err, docs) => {
            if (err) {
                return reject(err);
            }
            const postsSorted = sortByIndex(docs);
            const i = postsSorted.findIndex((e) => e.titleURL === titleURL) - 1;
            let targetPost = postsSorted[i];
            if (!targetPost) {
                targetPost = postsSorted[0];
            }
            resolve({ titleURL: targetPost.titleURL });
        });
    });
}

export function getNextPostTitleUrl(titleURL: string): Promise<{ titleURL: string }> {
    return new Promise((resolve, reject) => {
        PostModel.find((err, docs) => {
            if (err) {
                return reject(err);
            }
            const postsSorted = sortByIndex(docs);
            const i = postsSorted.findIndex((e) => e.titleURL === titleURL) + 1;
            let targetPost = postsSorted[i];
            if (!targetPost) {
                targetPost = postsSorted[postsSorted.length - 1];
            }
            resolve({ titleURL: targetPost.titleURL });
        });
    });
}
