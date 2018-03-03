'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let imageSchema = new Schema({
    name: String,
    imageType: String,
    data: Buffer
});

module.exports = mongoose.model('image', imageSchema);
