const Order = require('../../models/order');

module.exports = {
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
                    .populate('service', 'title description images rating');
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
                return { ...result._doc, _id: result._id };
            } catch (err) {
                throw err;
            }
        }
    }
};