const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        required: true
    },
    date: String,
    deadline: String,
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    price: Number,
    client_review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },
    freelancer_review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },
});

module.exports = mongoose.model('Order', orderSchema);