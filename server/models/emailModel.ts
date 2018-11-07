import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

let emailSchema = new Schema({
    from: String,
    to: String,
    content: String
    }
);

export interface EmailDocument extends mongoose.Document {
}

export default mongoose.model<EmailDocument>('email', emailSchema);
