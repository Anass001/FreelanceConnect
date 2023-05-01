const moongose = require('mongoose');

const userSchema = new moongose.Schema({
    email: {
        type: String,
        required: true
    },
    username: String,
    password: String,
    full_name: String,
    bio: String,
    profile_picture: String,
    joined_date: String,
    last_login: String,
    is_active: Boolean,
    freelance_rating: Number,
    client_rating: Number,
    earnings: Number,
    balance: Number,
    spending: Number,
    services: [
        {
            type: moongose.Schema.Types.ObjectId,
            ref: 'Service'
        }
    ],
    reviews: [
        {
            type: moongose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    notifications: [
        {
            type: moongose.Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ],
    orders: [
        {
            type: moongose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    conversations: [
        {
            type: moongose.Schema.Types.ObjectId,
            ref: 'Conversation'
        }
    ],
});

module.exports = moongose.model('User', userSchema);