import React, { Component } from 'react';
import ServiceCard from '../../components/service-card/ServiceCard';
import { gql, useQuery } from '@apollo/client';
import Reviews from '../../components/reviews/Reviews';
import './Profile.css';
import { Link } from 'react-router-dom';

const GET_SERVICES_BY_USER_ID = gql`
    query GetServicesByUserId($userId: ID!) {
        servicesByUserId(userId: $userId) {
            _id
            description
            price
            images
            freelancer {
                _id
                username
                profile_picture
            }
        }
    }
`;

function Services(props) {

    // const isCurrentUser = props.userId === Cookies.get('userId');
    const isCurrentUser = true;

    const { loading, error, data } = useQuery(GET_SERVICES_BY_USER_ID, {
        variables: { userId: props.userId },
    }
    );
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (data) console.log(data);
    return (
        <div className="services__grid__wrapper row">
            {
                isCurrentUser &&
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <Link to={`/create`}>
                        <div className="service-card add-service-card">
                            <div className='service-card__wrapper'>
                                <span class="material-symbols-outlined">
                                    add
                                </span>
                                <p className='add-service__title'>Add service</p>
                            </div>
                        </div>
                    </Link>
                </div>
            }
            {data.servicesByUserId.map((service) => (
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <ServiceCard key={service._id} service={service} />
                </div>
            ))}
        </div>
    );
}

function Profile() {
    return (
        <div className="profile__wrapper row">
            <div className="service-freelancer-info__container col-xs-12 col-sm-8 col-md-6 col-lg-3">
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
                </div>
                <Reviews userId="64588c572d6032dd97162aa6" />
            </div>
            <div className='service__container col-xs-12 col-sm-9 col-md-9 col-lg-9'>
                <h1 className='service__title'>Services</h1>
                <Services userId="64588c572d6032dd97162aa6" />
            </div>
        </div>
    );
}

export default Profile;