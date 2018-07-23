import PostModel, { PostDocument } from '../models/postModel';
import SlideModel, { SlideDocument } from '../models/slideModel';
import AboutModel, { AboutDocument } from '../models/aboutModel';
import UserModel from '../models/userModel';
import { Promise as MongoosePromise } from 'mongoose';
import { Post } from '../models/frontModels';
import { Slide } from '../models/frontModels';
import { Document } from 'mongoose';
import * as logger from './logger';

interface IndexedDocument extends Document {
    index: number;
}

interface UpdateResponse {
    n: number;
    nModified: number;
    ok: number;
}

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

function sortByIndex<T extends IndexedDocument>(docs: Array<T>): Array<T> {
    let sortedDocs;
    try {
        sortedDocs = docs.sort((a, b) => a.index - b.index);
    } catch (err) {
        logger.error(err);
        sortedDocs = docs;
    }
    return sortedDocs;
}

function castMongoosePromise<T>(mongoosePromise: MongoosePromise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        mongoosePromise.then(data => resolve(data), err => reject(err));
    });
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

export function updateIndices(indexPairs: { index: number, titleURL: string }[]): Promise<Array<UpdateResponse>> {
    let promises = new Array<Promise<UpdateResponse>>();
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
                reject(err);
            }
            resolve(sortByIndex(docs.map((post) => deleteID(post))));
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
            let postsSorted = sortByIndex(docs);
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
            let postsSorted = sortByIndex(docs);
            let i = postsSorted.findIndex((e) => e.titleURL === titleURL) - 1;
            let targetPost = postsSorted[i];
            if (!targetPost) {
                targetPost = postsSorted[postsSorted.length - 1];
            }
            resolve({ titleURL: targetPost.titleURL });
        });
    });
}

export function getSlides(): Promise<Array<SlideDocument>> {
    return new Promise((resolve, reject) => {
        SlideModel.find((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(sortByIndex(docs.map((slide) => deleteID(slide))));
        });
    });
}

export function saveSlide(slide: Slide): Promise<SlideDocument> {
    return new Promise((resolve, reject) => {
        SlideModel.count({}, (err, count) => {
            if (err) {
                logger.error(err);
            } else {
                slide.index = count;
            }
            let newSlide = new SlideModel(slide);
            newSlide.save((error, product) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(deleteID(product));
                }
            });
        });
    });
}

export function updateSlide(imageURL: string, update: any): Promise<Document> {
    return castMongoosePromise(SlideModel.update({ imageURL }, update).exec());
}

export function deleteSlide(imageURL: string): Promise<Document> {
    return castMongoosePromise(SlideModel.deleteOne({ imageURL }).exec());
}

export function getAbout(): Promise<AboutDocument> {
    return new Promise((resolve, reject) => {
        AboutModel.findOne((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(deleteID(docs));
        });
    });
}

export function updateAbout(update: any): Promise<UpdateResponse> {
    return castMongoosePromise(AboutModel.updateOne({ }, update).exec());
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
