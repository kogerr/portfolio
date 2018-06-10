'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let aboutSchema = new Schema({
    arsPoetica1: String,
    arsPoetica2: String,
    clients: [String],
    exhibitions: [String],
    printPublications: [new Schema({
        text: String,
        url: String
    }, { _id: false })],
    onlinePublications: [new Schema({
        text: String,
        url: String
    }, { _id: false })],
    awards: [new Schema({
        title: String,
        lines: [String]
    }, { _id: false })]
});

module.exports = mongoose.model('about', aboutSchema);
