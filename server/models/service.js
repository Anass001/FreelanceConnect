import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,
        required: true
    },
    freelancer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    images: [String],
    rating: {
        type: Number,
        default: 0
    }
});

export default model('Service', serviceSchema);