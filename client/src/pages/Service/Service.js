import React from 'react';
import './Service.css';
import Rating from '../../components/rating/Rating';
import Review from '../../components/review/Review';
import ImageCarousel from '../../components/carousel/ImageCarousel';

function Service() {
    return (
        <div className="service__wrapper">
            <div className='service__container'>
                <div className="service-info__container">
                    <h1 className='service-title'>I will develop any web application in php framework Symfony</h1>
                    <Rating value={3.5} count={12} />
                    <div className="service-image__carousel">
                        <ImageCarousel slidesToShow={1} slidesToScroll={1} images={["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"]} />
                    </div>
                    <div className="service-info__description">
                        I will develop any web application in php framework Symfony
                    </div>
                </div>
                <div className="service-reviews__container">
                    <div className="service-reviews__header">
                        <h1 className='service-reviews__title'>Reviews</h1>
                        <p className='service-reviews__count'>(12)</p>
                    </div>
                    <Review src="https://via.placeholder.com/150" name="John Doe" value={4.5}>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ligula vel sapien aliquet faucibus. Curabitur bibendum sit amet metus non posuere. Proin dignissim, risus in pharetra faucibus, ipsum lectus pretium metus, nec congue nisi dolor vel augue. Vestibulum sodales nisi in felis porta, at dignissim libero pulvinar. Sed fringilla tellus bibendum ipsum gravida, scelerisque vehicula tortor varius. Donec at posuere risus. Curabitur porta, nisi sed semper faucibus, nulla purus sollicitudin augue, et maximus purus risus nec lectus. Sed quis urna porta, rhoncus neque quis, luctus lectus. In at mattis est, eu commodo nisi. Nullam finibus mollis risus, at aliquet elit fermentum eget. Donec dapibus vulputate enim.
                        </p>
                    </Review>
                </div>
            </div>
            <div className="service-freelancer__container">
                <div className="service-freelancer__info">
                    <div className="service-freelancer__avatar">
                        <img src="https://via.placeholder.com/150" alt="avatar" />
                    </div>
                    <div className="service-freelancer__personal-info-wrapper">
                        <h3 className="service-freelancer__name">John Doe</h3>
                        <div className="service-freelancer__level">Noob</div>
                    </div>
                </div>
                <div className="service-freelancer__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu ligula vel sapien aliquet faucibus. Curabitur bibendum sit amet metus non posuere. Proin dignissim, risus in pharetra faucibus, ipsum lectus pretium metus, nec congue nisi dolor vel augue. Vestibulum sodales nisi in felis porta, at dignissim libero pulvinar. Sed fringilla tellus bibendum ipsum gravida, scelerisque vehicula tortor varius. Donec at posuere risus. Curabitur porta, nisi sed semper faucibus, nulla purus sollicitudin augue, et maximus purus risus nec lectus. Sed quis urna porta, rhoncus neque quis, luctus lectus. In at mattis est, eu commodo nisi. Nullam finibus mollis risus, at aliquet elit fermentum eget. Donec dapibus vulputate enim.
                </div>
                <button className="service-freelancer__hire-button">Hire</button>
            </div>
        </div>
    )
}

export default Service;