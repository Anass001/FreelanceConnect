import React from 'react';
import './Reviews.css';
import Review from '../review/Review';
import { gql, useQuery } from '@apollo/client';

const reviews = [];

const GET_REVIEWS_BY_USER_ID = gql`
    query GetReviewsByUserId($userId: ID!) {
        reviewsByUserId(userId: $userId) {
            _id
            reviewer {
                _id
                username
                profile_picture
            }
            rating
            content
        }
    }
`;

const GET_REVIEWS_BY_SERVICE_ID = gql`
    query GetReviewsByServiceId($serviceId: ID!) {
        reviewsByServiceId(serviceId: $serviceId) {
            _id
            reviewer {
                _id
                username
                profile_picture
            }
            rating
            content
        }
    }
`;

function Reviews(props) {

    if (props.userId) {
        GetReviewsByUserId(props.userId)
    } else if (props.serviceId) {
        GetReviewsByServiceId(props.serviceId)
    }
    else {
        return Error("No props passed to Reviews component");
    }

    if (reviews.length === 0) return null;

    return (
        <div className="service-reviews__container">
            <div className="service-reviews__header">
                <h1 className='service-reviews__title'>Reviews</h1>
                <p className='service-reviews__count'>({reviews.length})</p>
            </div>
            {reviews.map((review) => (
                <Review
                    key={review._id}
                    src={review.reviewer.profile_picture} name={review.reviewer.username} value={review.rating}>
                    <p>
                        {review.content}
                    </p>
                </Review>
            ))}
        </div>
    )
}

function GetReviewsByServiceId(serviceId) {

    reviews.length = 0;

    const { loading, error, data } = useQuery(GET_REVIEWS_BY_SERVICE_ID, {
        variables: { serviceId: serviceId },
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (data) {
        data.reviewsByServiceId.map((review) => {
            reviews.push(review);
        })
    }
}

function GetReviewsByUserId(userId) {
    reviews.length = 0;
    const { loading, error, data } = useQuery(GET_REVIEWS_BY_USER_ID, {
        variables: { userId: userId }
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (data) {
        data.reviewsByUserId.map((review) => {
            reviews.push(review);
        })
    }
}

export default Reviews;