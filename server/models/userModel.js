import mongoose, { Schema } from 'mongoose';
import mongoDbErrorHandler from 'mongoose-mongodb-errors';

const user = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

user.plugin(mongoDbErrorHandler);

export default mongoose.model('User', user);