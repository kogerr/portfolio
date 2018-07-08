'use strict';
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

let slideSchema = new Schema({
    title: String,
    imageUrl: String,
    link: String,
});

export default mongoose.model('slide', slideSchema);
