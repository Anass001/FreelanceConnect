const Conversation = require('../../models/conversation');
const Message = require('../../models/message');

module.exports = {
    Query: {
        conversationByOrderId: async (_parent, { orderId }) => {
            try {
                const conversation = await Conversation.findOne({ order: orderId })
                    .populate('messages')
                    .populate('users', 'username profile_picture')
                console.log(conversation.messages)
                return { ...conversation._doc, _id: conversation._id };
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        sendMessage: async (_parent, { message }, { req }) => {
            // if (!req.isAuth) {
            //     throw new Error('Unauthenticated!');
            // }
            try {
                const newMessage = new Message({
                    sender: message.sender,
                    body: message.body,
                    date: Date.now(),
                    conversation: message.conversation
                });
                const result = await newMessage.save();

                const conversation = await Conversation.findById(message.conversation);
                conversation.messages.push(result._id);
                await conversation.save();

                return { ...result._doc, _id: result._id };
            } catch (err) {
                throw err;
            }
        }
    }
};