import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  }
});

export default model('Message', messageSchema);