import Conversation from '../../models/conversation.js';
import Message from '../../models/message.js';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const ChatResolver = {
    Subscription: {
        messageSent: {
            subscribe: (_parent, { conversationId }) => {
                return pubsub.asyncIterator([conversationId]);
            }
        }
    },
    Query: {
        conversationByOrderId: async (_parent, { orderId }, context) => {
            if (!context.isAuth) {
                throw new Error("Unauthenticated");
            }
            try {
                const conversation = await Conversation.findOne({ order: orderId })
                    .populate('messages')
                    .populate('users', 'username profile_picture')

                if (context.userId !== conversation.users[0]._id.toString() && context.userId !== conversation.users[1]._id.toString()) {
                    throw new Error("Unauthorized");
                }

                return { ...conversation._doc, _id: conversation._id };
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        sendMessage: async (_parent, { message }, context) => {
            if (!context.isAuth) {
                throw new Error("Unauthenticated");
            }
            try {
                const newMessage = new Message({
                    sender: message.sender,
                    body: message.body,
                    date: Date.now(),
                    conversation: message.conversation
                });
                const result = await newMessage.save();

                const conversation = await Conversation.findById(message.conversation);

                if (context.userId !== conversation.users[0]._id.toString() && context.userId !== conversation.users[1]._id.toString()) {
                    throw new Error("Unauthorized");
                }

                pubsub.publish(message.conversation, {
                    messageSent: { ...result._doc, _id: result._id }
                });

                conversation.messages.push(result._id);
                await conversation.save();

                return { ...result._doc, _id: result._id };
            } catch (err) {
                throw err;
            }
        }
    }
};

export default ChatResolver;