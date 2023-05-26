import React from 'react'
import { Link } from 'react-router-dom'
import './ServiceCard.css'
import Rating from '../rating/Rating'
import defaultImage from '../../assets/images/default-user-image.png'

const ServiceCard = ({ service }) => {

    return (
        <div className="service-card">
            <Link to={`/services/${service._id}`}>
                <div className='service-card__wrapper'>
                    <div className='service-card__body__wrapper'>
                        <div className='service-card__header'>
                            <div className='service-card__header__freelancer-info'>
                                <img src={service.freelancer.profile_picture ? service.freelancer.profile_picture : defaultImage} alt={service.freelancer.username ? service.freelancer.username : ""} />
                                <p>{service.freelancer.username ? service.freelancer.username : ""}</p>
                            </div>
                        </div>
                        <div className='service-card__image'>
                            <img src={service.images[0] ? service.images[0] : ""} alt={service.name} />
                        </div>
                        <Rating value={
                            service.rating ? service.rating : 0
                        } count={
                            service.reviews ? service.reviews.length : 0
                        } />
                        <h3 className='service-card__title'>
                            {service.title}
                        </h3>
                    </div>
                    <div className='service-card__price__wrapper'>
                        <p>starting at</p>
                        <div className='service-card__price'>
                            ${service.price}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ServiceCard
