import React from 'react'
import { Link } from 'react-router-dom'
import './ServiceCard.css'
import Rating from '../rating/Rating'

const ServiceCard = ({ service }) => {
    return (
        <div className="service-card">
            <Link to={`/services/${service._id}`}>
                <div className='service-card__wrapper'>
                    <div className='service-card__header'>
                        <div className='service-card__header__freelancer-info'>
                            <img src={service.freelancer.image} alt={service.freelancer.name} />
                            <p>{service.freelancer.name}</p>
                        </div>
                    </div>
                    <div className='service-card__image'>
                        <img src={service.image} alt={service.name} />
                    </div>
                    <Rating value={0.4} count={0} />
                    <h3 className='service-card__title'>
                        {service.name}
                    </h3>
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
