import Review from '../../models/review.js';
import Order from '../../models/order.js';
import Service from '../../models/service.js';
import User from '../../models/user.js';

const ReviewsResolver = {
    Query: {
        reviewsByUserId: async (_parent, { userId }, req) => {
            try {
                const reviews = await Review.find({ reviewee: userId }).populate('reviewer', 'username profile_picture');
                return reviews.map(review => {
                    return { ...review._doc, _id: review.id };
                });
            } catch (err) {
                throw err;
            }
        },
        reviewsByServiceId: async (_parent, { serviceId }, req) => {
            try {
                const service = await Service.findById(serviceId);
                const orders = await Order.find({ service: serviceId });
                const orderIds = orders.map(order => order._id);
                const reviews = await Review.find({ order: { $in: orderIds } }).populate('reviewer', 'username profile_picture');
                const filteredReviews = reviews.filter(review => review.reviewer._id.toString() !== service.freelancer.toString());

                return filteredReviews.map(review => {
                    return { ...review._doc, _id: review.id };
                });
            } catch (err) {
                throw err;
            }
        },
        reviewsByOrderId: async (_parent, { orderId }, req) => {
            try {
                const reviews = await Review.find({ order: orderId }).populate('reviewer', 'username profile_picture');
                return reviews.map(review => {
                    return { ...review._doc, _id: review.id };
                });
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        createReview: async (_parent, { review }, context) => {
            if (!context.isAuth) {
                throw new Error('Unauthenticated!');
            }
            const newReview = new Review({
                reviewer: context.userId,
                reviewee: review.reviewee,
                rating: review.rating,
                content: review.content,
                date: Date.now(),
                order: review.order,
                service: review.service
            });

            // update service rating
            const order = await Order.findById(review.order);
            if (order.freelancer.toString() !== context.userId.toString()) {
                const service = await Service.findById(order.service);
                const reviews = (await Review.find({ service: review.service })).filter(review => review.reviewee.toString() === service.freelancer.toString());
                const ratings = reviews.map(review => review.rating);
                const averageRating = ratings > 0 ? (ratings.reduce((a, b) => a + b, 0) + newReview.rating) / (ratings.length + 1) : newReview.rating;
                console.log("ratings.reduce: ", ratings.reduce((a, b) => a + b, 0))
                console.log("ratings count: ", ratings.length)
                console.log("average rating: ", averageRating)
                console.log("new review rating: ", newReview.rating)
                service.rating = averageRating;
                await service.save();
            }

            // update user rating as freelancer
            const user = await User.findById(review.reviewee);
            // find all reviews where user is the reviewee and is a freelancer
            const allReviews = await Review.find({ reviewee: review.reviewee }).populate('order');
            const reviews = allReviews.filter(review => review.order.freelancer.toString() === review.reviewee.toString());
            const ratings = reviews.map(review => review.rating);
            const averageRating = ratings > 0 ? (ratings.reduce((a, b) => a + b, 0) + newReview.rating) / (ratings.length + 1) : newReview.rating;

            console.log(averageRating);

            if (order.freelancer.toString() === review.reviewee.toString()) {
                user.freelance_rating = averageRating;
            } else {
                user.client_rating = averageRating;
            }
            await user.save();

            try {
                const result = await newReview.save();
                return result;
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    }
}

export default ReviewsResolver;