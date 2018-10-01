'use strict';
import * as mongoose from 'mongoose';
import { About } from './frontModels';
let Schema = mongoose.Schema;

let possiblyClickable = new Schema({
    index: Number,
    text: String,
    url: String
}, { _id: false }
);

let headerAndLines = new Schema({
    index: Number,
    header: String,
    lines: [String]
}, { _id: false }
);

let indexedText = new Schema({
    index: Number,
    text: String
}, { _id: false }
);

let aboutSchema = new Schema({
    intro: [indexedText],
    clients: [indexedText],
    exhibitions: [indexedText],
    printPublications: [possiblyClickable],
    onlinePublications: [possiblyClickable],
    awards: [headerAndLines],
    images: [String]
}
);

export interface AboutDocument extends About, mongoose.Document {
}

export default mongoose.model<AboutDocument>('about', aboutSchema);
