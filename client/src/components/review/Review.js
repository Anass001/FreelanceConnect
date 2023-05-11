import React from 'react';
import './Review.css';
import Rating from '../rating/Rating';
import defaultImage from '../../assets/images/default-user-image.png';

function Review(props) {
    return (
        <div className="review__container">
            <div className="review__header">
                <div className="review__personal-info-wrapper">
                    <img src={props.src || defaultImage} alt="avatar" />
                    <p className="review__name">{props.name}</p>
                </div>
                <div className="review__rating">
                    <Rating value={props.value} count={0} />
                </div>
            </div>
            <div className="review__description">
                {props.children}
            </div>
        </div>
    )
}

export default Review;