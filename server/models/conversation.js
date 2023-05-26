const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        populate: {
            path: 'sender',
            select: '_id username profile_picture'
        }
    }],
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = mongoose.model('Conversation', conversationSchema);