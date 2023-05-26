import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "./Search.css";
import ServiceCard from "../../components/service-card/ServiceCard";

const GET_SERVICES_BY_QUERY = gql`
    query GetServicesByQuery($searchQuery: String!) {
        servicesBySearchQuery(searchQuery: $searchQuery) {
            _id
            description
            price
            title
            images
            freelancer {
                _id
                username
                profile_picture
            }
        }
    }
`;

const Search = () => {

    const { query } = useParams();
    const { loading, error, data } = useQuery(GET_SERVICES_BY_QUERY, {
        variables: { searchQuery: query }
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    if (data) console.log(data);


    return (
        <div className="services">
            <h2>Search Results</h2>
            <div className="services__grid__wrapper row">
                {data.servicesBySearchQuery.map((service) => (
                    <div className="col-xs-12 col-sm-8 col-md-6 col-lg-3">
                        <ServiceCard key={service._id} service={service} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;