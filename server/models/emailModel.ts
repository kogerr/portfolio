import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    from: String,
    to: String,
    content: String
    }
);

export interface EmailDocument extends mongoose.Document {
}

export default mongoose.model<EmailDocument>('email', emailSchema);
