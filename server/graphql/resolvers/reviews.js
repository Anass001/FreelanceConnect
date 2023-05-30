import Review from '../../models/Review.js';

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
        }
    },
    Mutation: {
        createReview: async (_parent, { review }, req) => {
            if (!req.isAuth) throw new Error('Unauthenticated');
            const newReview = new Review({
                // TODO: userId should be included in token in order to be able to create a review
                reviewer: review.reviewer,
                reviewee: review.reviewee,
                rating: review.rating,
                content: review.content,
                date: Date.now(),   
                service: review.service,
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