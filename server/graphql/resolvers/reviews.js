import Review from '../../models/review.js';

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
                const reviews = await Review.find({ service: serviceId }).populate('reviewer', 'username profile_picture');
                return reviews.map(review => {
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
                // TODO: userId should be included in token in order to be able to create a review
                reviewer: context.userId,
                reviewee: review.reviewee,
                rating: review.rating,
                content: review.content,
                date: Date.now(),
                order: review.order,
            });
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