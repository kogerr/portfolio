'use strict';
import * as mongoose from 'mongoose';
import { About } from './frontModels';
const Schema = mongoose.Schema;

const possiblyClickable = new Schema({
    index: Number,
    text: String,
    url: String
}, { _id: false }
);

const headerAndLines = new Schema({
    index: Number,
    header: String,
    lines: [String]
}, { _id: false }
);

const indexedText = new Schema({
    index: Number,
    text: String
}, { _id: false }
);

const aboutSchema = new Schema({
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
