'use strict';
import * as mongoose from 'mongoose';
import { Contact } from './frontModels';
let Schema = mongoose.Schema;

let contactSchema = new Schema({
    mail: String,
    phone: String,
    linkedIn: String,
    behance: String
}
);

export interface ContactDocument extends Contact, mongoose.Document {
}

export default mongoose.model<ContactDocument>('contact', contactSchema);
