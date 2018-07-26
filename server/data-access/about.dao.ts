import AboutModel, { AboutDocument } from '../models/aboutModel';
import { castMongoosePromise, deleteID, UpdateResponse } from './dao_utils';

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
