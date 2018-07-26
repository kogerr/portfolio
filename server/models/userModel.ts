'use strict';
import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: String,
    password: String,
});

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

export default mongoose.model<UserDocument>('user', userSchema);
