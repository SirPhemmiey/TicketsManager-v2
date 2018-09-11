import mongoose, { Schema } from 'mongoose';
import mongoDbErrorHandler from 'mongoose-mongodb-errors';

const user = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

//custom findByEmail query
// user.query.findByEmail = function(email) {
//     return this.where({ email: email});
// }
user.plugin(mongoDbErrorHandler);

export default mongoose.model('User', user);