'use strict';
import * as mongoose from 'mongoose';
import Slide from './Slide';
let Schema = mongoose.Schema;

let slideSchema = new Schema({
    index: Number,
    title: String,
    imageURL: String,
    link: String,
});

export interface SlideDocument extends Slide, mongoose.Document {
}

export default mongoose.model<SlideDocument>('slide', slideSchema);
