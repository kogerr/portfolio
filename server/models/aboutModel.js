'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let possiblyClickable = new Schema({
    text: String,
    url: String}, {_id: false}
);

let titledLines = new Schema({
    title: String,
    lines: [String]}, {_id: false}
);

let aboutSchema = new Schema({
    intro: String,
    clients: [String],
    exhibitions: [String],
    printPublications: [possiblyClickable],
    onlinePublications: [possiblyClickable],
    awards: [titledLines]}
);

module.exports = mongoose.model('about', aboutSchema);
