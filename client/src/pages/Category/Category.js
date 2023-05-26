import React, { Component } from 'react';
import Categories from '../../components/categories/Categories';
import ServiceCard from '../../components/service-card/ServiceCard';
import { gql, useQuery } from '@apollo/client';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import '../Home/Home.css';
import { NavLink, useParams } from 'react-router-dom';

const GET_SERVICES_BY_CATEGORY = gql`
    query GetServicesByCategory($category: String!) {
        servicesByCategory(category: $category) {
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

function Services() {

    const { category } = useParams();

    const { loading, error, data } = useQuery(GET_SERVICES_BY_CATEGORY, {
        variables: { category: category },
    });
    if (loading) return <LoadingIndicator />
    if (error) return `Error! ${error.message}`;
    return (
        <div className="services__grid__wrapper row">
            {data.servicesByCategory.map((service) => (
                <div className="col-xs-12 col-sm-8 col-md-6 col-lg-3">
                    <ServiceCard key={service._id} service={service} />
                </div>
            ))}
        </div>
    );
}

function Category() {
    return (
        <div>
            <Categories />
            <Services />
        </div>
    );
}

export default Category;