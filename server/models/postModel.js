'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    id: Number,
    title: String,
    client: String,
    text: String,
    cover: String,
    images: [String],
    timestamp: Date
});

module.exports = mongoose.model('post', postSchema);
