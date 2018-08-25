import mongoose, { Schema } from 'mongoose';
import mongoDbErrorHandler from 'mongoose-mongodb-errors';

const response = new Schema({
    response: { type: Text, required: true},
    ticket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: false}],
    date_responded: { type: Date }
});

response.plugin(mongoDbErrorHandler);

export default mongoose.model('Response', response);