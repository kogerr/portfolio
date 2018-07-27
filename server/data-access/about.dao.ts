import AboutModel, { AboutDocument } from '../models/aboutModel';
import { castMongoosePromise, deleteID, UpdateResponse } from './dao_utils';
import { PossiblyClickable, TitledLines, IndexedText } from '../models/frontModels';

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

export function updateAbout(update: any): Promise<UpdateResponse> | Promise<UpdateResponse> {
    return castMongoosePromise(AboutModel.updateOne({}, update).exec());
}

export function addElement(update: { [type: string]: IndexedText | PossiblyClickable | TitledLines }): Promise<UpdateResponse> {
    let field = Object.keys(update)[0];
    if (update[field].index) {
        return castMongoosePromise(AboutModel.updateOne({},
            { $push: { [field]: { $each: [update[field]], $sort: { index: 1 } } } }).exec());
    } else {
        return castMongoosePromise(AboutModel.updateOne({}, { $push: update }).exec());
    }
}

export function removeElement(update: { [type: string]: string | PossiblyClickable | TitledLines }): Promise<UpdateResponse> {
    return castMongoosePromise(AboutModel.updateOne({}, { $pull: update }).exec());
}

export function sortField(update: any): Promise<UpdateResponse> {
    let field = Object.keys(update)[0];
    return castMongoosePromise(AboutModel.updateOne({}, { $push: { [field]: { $each: [ ], $sort: { index: 1 } } } }).exec());
}
