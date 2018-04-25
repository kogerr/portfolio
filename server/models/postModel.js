'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    title: String,
    titleURL: String,
    type: String,
    link: String,
    year: Number,
    client: String,
    text: String,
    cover: String,
    images: [new Schema({
        name: String,
        width: String
    }, { _id: false })],
    timestamp: Date
});

module.exports = mongoose.model('post', postSchema);
