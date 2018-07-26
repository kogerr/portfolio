import * as logger from '../services/logger';
import { Document, Promise as MongoosePromise } from 'mongoose';

export interface IndexedDocument extends Document {
    index: number;
}

export interface UpdateResponse {
    n: number;
    nModified: number;
    ok: number;
}

/**
 * Deletes the _id from documents before letting them out.
 * @param {mongoose.Document} doc document read from database
 * @return {*} document without id
 */
export function deleteID<T extends Document>(doc: T): T {
    let response: T;
    try {
        response = doc.toObject();
        delete response._id;
    } catch (error) {
        logger.error(error);
    }
    return response;
}

export function sortByIndex<T extends IndexedDocument>(docs: Array<T>): Array<T> {
    let sortedDocs;
    try {
        sortedDocs = docs.sort((a, b) => a.index - b.index);
    } catch (err) {
        logger.error(err);
        sortedDocs = docs;
    }
    return sortedDocs;
}

export function castMongoosePromise<T>(mongoosePromise: MongoosePromise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        mongoosePromise.then(data => resolve(data), err => reject(err));
    });
}
