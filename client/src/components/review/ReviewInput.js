import React from 'react';
import './ReviewInput.css';
import { useMutation, gql } from '@apollo/client';
import Rating from '@mui/material/Rating';
import { useFormik } from 'formik';

const validate = (rating, content) => {
    const errors = {};
    if (rating === 0) {
        errors.rating = 'Rating cannot be 0';
    }
    if (content === '') {
        errors.content = 'Please write a review';
    }
    return errors;
};

const CREATE_REVIEW = gql`
    mutation CreateReview($order: ID!, $rating: Float!, $content: String!, $reviewee: ID!, $service: ID!) {
        createReview(review: { order: $order, rating: $rating, content: $content, reviewee: $reviewee, service: $service }){
            _id
        }
    }
`;

function ReviewInput({ orderId, revieweeId, serviceId }) {

    const [createReview] = useMutation(CREATE_REVIEW, {
        onCompleted: () => {
            window.location.reload();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const formik = useFormik({
        initialValues: {
            rating: 0,
            content: '',
        },
        onChange: values => {
            console.log(values);
        },
        validate,
        onSubmit: (values) => {
            console.log(values);
            createReview({ variables: { order: orderId, rating: values.rating, content: values.content, reviewee: revieweeId, service: serviceId } });
        },
    });

    return (
        <div className="reviews__wrapper">
            <form onSubmit={formik.handleSubmit}>
                <div className="review-input__wrapper">
                    <h2>Write a review</h2>
                    <Rating
                        className='review-input__rating'
                        id="rating"
                        name="rating"
                        value={
                            formik.values.rating
                        }
                        onChange={(event, newValue) => {
                            formik.setFieldValue('rating', newValue);
                        }}
                    />
                    {formik.errors.rating && formik.touched.rating ? <div className="review-input__error">{formik.errors.rating}</div> : null}
                    <textarea
                        id="content"
                        name="content"
                        rows={10}
                        type="text"
                        placeholder="Write a review here..."
                        onChange={formik.handleChange}
                        value={formik.values.content}
                    />
                    {formik.errors.content ? <div className="review-input__error">{formik.errors.content}</div> : null}
                    <div className="submit__button">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default ReviewInput;