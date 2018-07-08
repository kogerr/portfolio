'use strict';
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: String,
    password: String,
});

export default mongoose.model('user', userSchema);
