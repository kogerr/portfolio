'use strict';
import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
});

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

export default mongoose.model<UserDocument>('user', userSchema);
