import React from 'react';
import './Service.css';
import Rating from '../../components/rating/Rating';
import ImageCarousel from '../../components/carousel/ImageCarousel';
import Reviews from '../../components/reviews/Reviews';
import { NavLink, useParams } from 'react-router-dom';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import { useQuery, gql } from '@apollo/client';
import defaultImage from '../../assets/images/default-user-image.png';
import { useContext } from 'react';
import UserContext from '../../UserContext';
import Cookies from 'js-cookie';

const GET_service_BY_ID = gql`
    query GetServiceById($serviceId: ID!) {
        service(serviceId: $serviceId) {
            _id
            title
            description
            price
            images
            rating
            freelancer {
                _id
                username
                profile_picture
                bio
            }
            reviews {
                _id
                rating
                content
                reviewer {
                    _id
                    username
                    profile_picture
                }
            }
        }
    }
`;

function Service() {

    const { id } = useParams();

    const userId = useContext(UserContext).userId;
    const isFreelancer = Cookies.get('isFreelancer');

    const { loading, error, data } = useQuery(GET_service_BY_ID, {
        variables: { serviceId: id },
    }
    );
    if (loading) return <LoadingIndicator />;
    if (error) return `Error! ${error.message}`;
    if (data) console.log(data);

    return (
        <div className="service__wrapper row">
            <div className='service__container col-xs-12 col-sm-12 col-md-9 col-lg-9'>
                <div className="service-info__container">
                    <h1 className='service-title'>
                        {data.service.title}
                    </h1>
                    <Rating value={
                        data.service.rating
                    } count={
                        data.service.reviews.length
                    } />
                    <div className="service-image__carousel">
                        <ImageCarousel slidesToShow={1} slidesToScroll={1} images={
                            data.service.images
                        } />
                    </div>
                    <div className="service-info__description">
                        {data.service.description}
                    </div>
                </div>
                <Reviews serviceId={
                    data.service._id
                } />
            </div>
            <div className="service-freelancer__container col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <NavLink to={`/user/${data.service.freelancer._id}`} className="service-freelancer__link">
                    <div className="service-freelancer__info">
                        <div className="service-freelancer__avatar">
                            <img src={
                                data.service.freelancer.profile_picture ? data.service.freelancer.profile_picture : defaultImage
                            } alt="avatar" />
                        </div>
                        <div className="service-freelancer__personal-info-wrapper">
                            <h3 className="service-freelancer__name">{
                                data.service.freelancer.username
                            }</h3>
                            <div className="service-freelancer__level">Noob</div>
                        </div>
                    </div>
                </NavLink>
                <div className="service-freelancer__description">
                    {
                        data.service.freelancer.bio
                    }
                </div>
                {
                    isFreelancer === 'false' && userId !== data.service.freelancer._id ? (
                        <NavLink to={`/create-order/${data.service._id}`}>
                            <button className="service-freelancer__hire-button">Hire</button>
                        </NavLink>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Service;