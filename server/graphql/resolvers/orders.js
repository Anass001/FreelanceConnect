import Order from '../../models/order.js';
import Conversation from '../../models/conversation.js';

const OrdersResolver = {
    Query: {
        ordersByClientId: async (_parent, { userId }) => {
            try {
                const orders = await Order.find({ client: userId })
                    .populate('freelancer', 'username profile_picture')
                    .populate('service', 'title');
                return orders.map(order => {
                    return { ...order._doc, _id: order._id };
                });
            } catch (err) {
                throw err;
            }
        },
        ordersByFreelancerId: async (_parent, { userId }) => {
            try {
                const orders = await Order.find({ freelancer: userId }).populate('order_service');
                return orders.map(order => {
                    return { ...order._doc, _id: order._id };
                });
            } catch (err) {
                throw err;
            }
        },
        orderById: async (_parent, { orderId }) => {
            try {
                const order = await Order.findById(orderId)
                    .populate('client', 'username profile_picture')
                    .populate('freelancer', 'username profile_picture')
                    .populate('service', 'title description images rating')
                    .populate('conversation', 'messages');
                return { ...order._doc, _id: order._id };
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        createOrder: async (_parent, { order }, { req }) => {
            // if (!req.isAuth) {
            //     throw new Error('Unauthenticated!');
            // }
            try {
                const newOrder = new Order({
                    service: order.service,
                    client: order.client,
                    freelancer: order.freelancer,
                    status: 'PENDING',
                    date: Date.now(),
                    deadline: order.deadline,
                    price: order.price,
                });
                const result = await newOrder.save();
        

                console.log("hello"+result._id)

                const newConversation = new Conversation({
                    users: [order.client, order.freelancer],
                    order: result._id,
                    messages: []
                });

                await newConversation.save();

                return { ...result._doc, _id: result._id };
            } catch (err) {
                throw err;
            }
        },
        updateOrderStatus: async (_parent, { orderId, status }) => {
            try {
                const order = await Order.findById(orderId);
                order.status = status;
                const result = await order.save();
                return { ...result._doc, _id: result._id };
            } catch (err) {
                throw err;
            }
        }
    }
};

export default OrdersResolver;