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
    intro: String,
    cover: String,
    contents: [],
    facebookDescription: String,
    facebookImage: String,
    timestamp: Date,
});

module.exports = mongoose.model('post', postSchema);
