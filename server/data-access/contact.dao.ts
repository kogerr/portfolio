import ContactModel, { ContactDocument } from '../models/contactModel';
import { castMongoosePromise, deleteID, UpdateResponse } from './dao_utils';

export function getContact(): Promise<ContactDocument> {
    return new Promise((resolve, reject) => {
        ContactModel.findOne((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(deleteID(docs));
        });
    });
}

export function updateContact(update: any): Promise<UpdateResponse> {
    return castMongoosePromise(ContactModel.updateOne({ }, update).exec());
}
