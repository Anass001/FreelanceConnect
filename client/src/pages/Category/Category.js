import React from 'react';
import Categories from '../../components/categories/Categories';
import ServiceCard from '../../components/service-card/ServiceCard';
import { gql, useQuery } from '@apollo/client';
import LoadingIndicator from '../../components/loading-indicator/LoadingIndicator';
import { useParams } from 'react-router-dom';
import '../Home/Home.css';

const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            _id
            name
            url_name
        }
    }
`;

const GET_SERVICES_BY_CATEGORY_URL_NAME = gql`
    query GetServicesByCategory($categoryUrlName: String!) {
        servicesByCategoryUrlName(categoryUrlName: $categoryUrlName) {
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
            }
        }
    }
`;

function Services() {

    const { category } = useParams();

    const { loading, error, data } = useQuery(GET_SERVICES_BY_CATEGORY_URL_NAME, {
        variables: {
            categoryUrlName: category
        },
    });

    if (loading) return <LoadingIndicator />
    if (error) return `Error! ${error.message}`;
    return (
        <div className="services__grid__wrapper row">
            {data &&
                data.servicesByCategoryUrlName.map((service) => (
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <ServiceCard key={service._id} service={service} />
                    </div>
                ))}
        </div>
    );
}

function Category() {

    const { data } = useQuery(GET_CATEGORIES);

    return (
        <div>
            {
                data && <Categories categories={data.categories} />
            }
            <Services />
        </div>
    );
}

export default Category;