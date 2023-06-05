import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    date: String,
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }
});

export default model('Review', reviewSchema);