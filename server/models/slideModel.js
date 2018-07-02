'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let slideSchema = new Schema({
    title: String,
    imageUrl: String,
    link: String,
});

module.exports = mongoose.model('slide', slideSchema);
