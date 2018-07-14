import PostModel, { PostDocument } from '../models/postModel';
import SlideModel from '../models/slideModel';
import AboutModel from '../models/aboutModel';
import UserModel from '../models/userModel';
import Post from '../models/Post';
import { Document } from 'mongoose';
import * as logger from './logger';

/**
 * Deletes the _id from documents before letting them out.
 * @param {mongoose.Document} doc document read from database
 * @return {*} document without id
 */
function deleteID<T extends Document>(doc: T): T {
    let response: T;
    try {
        response = doc.toObject();
        delete response._id;
    } catch (error) {
        logger.error(error);
    }
    return response;
}

function sortPostsByTime(posts: Array<PostDocument>): Array<PostDocument> {
    let sortedPosts: Array<PostDocument>;
    try {
        sortedPosts = posts.sort((a, b) => b.timestamp.valueOf() - a.timestamp.valueOf());
    } catch (err) {
        logger.error(err);
        sortedPosts = posts;
    }
    return sortedPosts;
}

function sortPostsByIndex(posts: Array<PostDocument>): Array<PostDocument> {
    let sortedPosts: Array<PostDocument>;
    try {
        sortedPosts = posts.sort((a, b) => a.index - b.index);
    } catch (err) {
        logger.error(err);
        sortedPosts = posts;
    }
    return sortedPosts;
}

export function savePost(post: Post): Promise<PostDocument> {
    return new Promise((resolve, reject) => {
        PostModel.count({}, (err, count) => {
            if (err) {
                logger.error(err);
            } else {
                post.index = count;
            }
            let newPost = new PostModel(post);
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
                    reject(err);
                }
                resolve({ titleURL: raw.titleURL });
            }
        );
    });
}

export function updateIndices(indexPairs: { index: number, titleURL: string }[]): Promise<Array<any>> {
    let promises = new Array<Promise<any>>();
    indexPairs.forEach(e => {
        promises.push(
            PostModel.update({ titleURL: e.titleURL }, {index: e.index}).exec()
        );
    });
    return Promise.all(promises);
}

export function getPosts(): Promise<Array<PostDocument>> {
    return new Promise((resolve, reject) => {
        PostModel.find((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(sortPostsByIndex(docs.map((post) => deleteID(post))));
        });
    });
}

export function getPostsSorted(): Promise<Array<PostDocument>> {
    return new Promise((resolve, reject) => {
        PostModel.find((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(sortPostsByTime(docs).map((post) => deleteID(post)));
        });
    });
}

export function getPostByTitleURL(titleURL: string): Promise<PostDocument> {
    return new Promise((resolve, reject) => {
        PostModel.findOne({ titleURL }, (err, data) => {
            if (err) {
                reject(err);
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
                reject(err);
            }
            let postsSorted = sortPostsByIndex(docs);
            let i = postsSorted.findIndex((e) => e.titleURL === titleURL) + 1;
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
                reject(err);
            }
            let postsSorted = sortPostsByIndex(docs);
            let i = postsSorted.findIndex((e) => e.titleURL === titleURL) - 1;
            let targetPost = postsSorted[i];
            if (!targetPost) {
                targetPost = postsSorted[postsSorted.length - 1];
            }
            resolve({ titleURL: targetPost.titleURL });
        });
    });
}

export function getSlides(): Promise<Array<Document>> {
    return new Promise((resolve, reject) => {
        SlideModel.find((err, docs) => {
            if (err) {
                reject(err);
            }
            docs.map((slide) => deleteID(slide));
            resolve(docs);
        });
    });
}

export function saveSlide(slide: any): Promise<Document> {
    let newSlide = new SlideModel(slide);
    return newSlide.save();
}

export function getAbout(): Promise<Document> {
    return new Promise((resolve, reject) => {
        AboutModel.findOne((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(deleteID(docs));
        });
    });
}

export function updateAbout(about: any): Promise<{ data: any }> {
    return new Promise((resolve, reject) => {
        AboutModel.update({}, about,
            (err, raw) => {
                if (err) {
                    reject(err);
                }
                resolve({ data: raw });
            }
        );
    });
}

export function checkUser(email: string, password: string): Promise<{ found: boolean }> {
    return new Promise((resolve, reject) => {
        UserModel.find({ email, password }, (err, docs) => {
            if (err) {
                reject(err);
            }
            if (docs.length) {
                resolve({ found: true });
            } else {
                resolve({ found: false });
            }
        });
    });
}
