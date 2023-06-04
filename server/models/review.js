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
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: String,
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

export default model('Review', reviewSchema);