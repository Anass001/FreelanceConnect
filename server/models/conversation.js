import { Schema, model } from 'mongoose';

const conversationSchema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        populate: {
            path: 'sender',
            select: '_id username profile_picture'
        }
    }],
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

export default model('Conversation', conversationSchema);