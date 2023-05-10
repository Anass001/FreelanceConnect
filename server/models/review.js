const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewee: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }
});

module.exports = mongoose.model('Review', reviewSchema);