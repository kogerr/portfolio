import AboutModel, { AboutDocument } from '../models/aboutModel';
import { castMongoosePromise, deleteID, UpdateResponse } from './dao_utils';
import { About, PossiblyClickable, TitledLines } from '../models/frontModels';

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
    return castMongoosePromise(AboutModel.updateOne({}, update).exec());
}

export function addElement(update: {[type: string]: string | PossiblyClickable | TitledLines}): Promise<UpdateResponse> {
    return castMongoosePromise(AboutModel.updateOne({}, { $push: update }).exec());
}

export function removeElement(update: {[type: string]: string | PossiblyClickable | TitledLines}): Promise<UpdateResponse> {
    return castMongoosePromise(AboutModel.updateOne({}, { $pull: update }).exec());
}
