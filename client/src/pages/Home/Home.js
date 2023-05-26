import React, { Component } from 'react';
import Categories from '../../components/categories/Categories';
// import ServiceCard from '../../components/service-card/ServiceCard';
import { gql, useQuery } from '@apollo/client';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import './Home.css';
import { Suspense } from 'react';

const ServiceCard = React.lazy(() => import('./../../components/service-card/ServiceCard'));

// TODO: change to getServicesByCategory
const GET_SERVICES = gql`
    query GetServices {
        services {
            _id
            title
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

function Services() {
    const { loading, error, data } = useQuery(GET_SERVICES);
    if (loading) return <LoadingIndicator />
    if (error) return `Error! ${error.message}`;
    return (
        <div className="services__grid__wrapper row">
            {data.services.map((service) => (
                <div className="col-xs-12 col-sm-8 col-md-6 col-lg-3">
                    <Suspense fallback={<div> Please Wait... </div>} >
                        <ServiceCard key={service._id} service={service} />
                    </Suspense>
                </div>
            ))}
        </div>
    );
}

function Home() {
    return (
        <div>
            <Categories />
            <Services />
        </div>
    );
}

export default Home;