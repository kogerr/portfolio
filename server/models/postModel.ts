'use strict';
import * as mongoose from 'mongoose';
import Post from './Post';
let Schema = mongoose.Schema;

let postSchema = new Schema({
    index: Number,
    title: String,
    titleURL: String,
    type: String,
    link: String,
    year: Number,
    client: String,
    intro: String,
    cover: String,
    contents: [],
    facebookDescription: String,
    facebookImage: String,
    timestamp: Date,
});

export interface PostDocument extends Post, mongoose.Document {
}

export default mongoose.model<PostDocument>('post', postSchema);
