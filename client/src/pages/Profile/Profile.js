import React, { useContext } from 'react';
import ServiceCard from '../../components/service-card/ServiceCard';
import { gql, useQuery } from '@apollo/client';
import Reviews from '../../components/reviews/Reviews';
import './Profile.css';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/images/default-user-image.png'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import UserContext from '../../UserContext';

const GET_SERVICES_BY_USER_ID = gql`
    query GetServicesByUserId($userId: ID!) {
        servicesByUserId(userId: $userId) {
            _id
            title
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

const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            profile_picture
            bio
        }
    }
`;

function Services(props) {

    const userData = useContext(UserContext);

    const isCurrentUser = props.isCurrentUser;

    const { loading, error, data } = useQuery(GET_SERVICES_BY_USER_ID, {
        variables: { userId: props.userId },
    }
    );
    if (loading) return <LoadingIndicator />;
    if (error) return `Error! ${error.message}`;
    if (data) console.log(data);
    return (
        <div className="services__grid__wrapper row">
            {
                isCurrentUser &&
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                    <Link to={`/create-service`}>
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

    const { id } = useParams();

    const userData = useContext(UserContext);

    const isFreelancer = Cookies.get('isFreelancer') === 'true';

    const isCurrentUser = id === userData.userId;

    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { userId: id },
    }
    );
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (data) console.log(data);

    return (
        <div className="profile__wrapper row">
            <div className="service-freelancer-info__container col-xs-12 col-sm-8 col-md-6 col-lg-3">
                {
                    data.user &&
                    <div className="service-freelancer__container">
                        <div className="service-freelancer__info">
                            <div className="service-freelancer__avatar">
                                <img src={data.user.profile_picture || defaultImage} alt="avatar" />
                            </div>
                            <div className="service-freelancer__personal-info-wrapper">
                                <h3 className="service-freelancer__name">{data.user.username}</h3>
                                <div className="service-freelancer__level">Noob</div>
                            </div>
                            {isCurrentUser &&
                                <div className="service-freelancer__edit-profile">
                                    <Link to={`/profile/edit`}>
                                        <span class="material-symbols-outlined">
                                            edit
                                        </span>
                                    </Link>
                                </div>
                            }
                        </div>
                        <div className="service-freelancer__description">{data.user.bio}</div>
                    </div>
                }
                <Reviews userId={id} />
            </div>
            {
                (isFreelancer || !isCurrentUser) &&
                <div className='service__container col-xs-12 col-sm-9 col-md-9 col-lg-9'>
                    <h1 className='service__title'>Services</h1>
                    <Services userId={id} isCurrentUser={isCurrentUser} />
                </div>
            }
        </div>
    );
}

export default Profile;