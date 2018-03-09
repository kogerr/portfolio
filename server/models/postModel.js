'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    _id: String,
    title: String,
    titleURL: String,
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
