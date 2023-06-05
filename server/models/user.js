import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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
    freelance_rating: {
        type: Number,
        default: 0
    },
    client_rating: {
        type: Number,
        default: 0  
    },
    earnings: Number,
    balance: Number,
    spending: Number,
    services: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Service'
        }
    ],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ],
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    conversations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Conversation'
        }
    ],
});

export default model('User', userSchema);