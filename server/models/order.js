import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    freelancer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        required: true
    },
    date: String,
    deadline: String,
    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    price: Number,
    client_review: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
    freelancer_review: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    },
});

export default model('Order', orderSchema);