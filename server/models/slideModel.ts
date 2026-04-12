'use strict';
import * as mongoose from 'mongoose';
import { Slide } from './frontModels';
const Schema = mongoose.Schema;

const slideSchema = new Schema({
    index: Number,
    title: String,
    imageURL: String,
    link: String,
});

export interface SlideDocument extends Slide, mongoose.Document {
}

export default mongoose.model<SlideDocument>('slide', slideSchema);
