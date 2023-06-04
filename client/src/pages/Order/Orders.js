import React, { useContext } from 'react';
import './Orders.css';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Cookies from 'js-cookie';
import defaultImage from '../../assets/images/default-user-image.png';
import UserContext from '../../UserContext';

const GET_ORDERS_BY_CLIENT_ID = gql`
    query getOrdersByClientId($userId: ID!) {
        ordersByClientId(userId: $userId) {
            _id
            service {
                title
            }
            freelancer {
                username
                profile_picture
            }
            status
        }
    }
`;

const GET_ORDERS_BY_FREELANCER_ID = gql`
    query getOrdersByFreelancerId($userId: ID!) {
        ordersByFreelancerId(userId: $userId) {
            _id
            service {
                title
            }
            client {
                username
                profile_picture
            }
            status
        }
    }
`;

function FreelancerOrders() {

    const navigate = useNavigate();

    const userId = useContext(UserContext).userId

    const { loading: ordersLoading, error: ordersError, data: ordersData } = useQuery(GET_ORDERS_BY_FREELANCER_ID, {
        variables: { userId: userId },
    });

    return (
        <div>
            <h1 className='orders__header__title'>Orders</h1>
            {(ordersData) && <div className="orders-table__wrapper">
                <table className="orders-table">
                    <tbody>
                        {
                            ordersData.ordersByFreelancerId.map(order => (
                                <tr key={order._id}>
                                    <Link to={`/orders/${order._id}`}>
                                        <td>
                                            <div className="orders-table__freelancer-info">
                                                <img src={order.client.profile_picture ? order.client.profile_picture : defaultImage} alt={order.client.username ? order.client.username : ""} />
                                            </div>
                                        </td>
                                        <td>
                                            <p>{order.client.username ? order.client.username : ""}</p>
                                        </td>
                                        <td>
                                            <div>
                                                {order.service.title}
                                            </div>
                                        </td>
                                        <td>{order.status}</td>
                                    </Link>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

function ClientOrders() {

    const navigate = useNavigate();

    const userId = useContext(UserContext).userId

    const { loading: ordersLoading, error: ordersError, data: ordersData } = useQuery(GET_ORDERS_BY_CLIENT_ID, {
        variables: { userId: userId },
    });

    return (
        <div>
            <h1 className='orders__header__title'>Orders</h1>
            {(ordersData) && <div className="orders-table__wrapper">
                <table className="orders-table">
                    <tbody>
                        {
                            ordersData.ordersByClientId.map(order => (
                                <tr key={order._id}>
                                    <Link to={`/orders/${order._id}`}>
                                        <td>
                                            <div className="orders-table__freelancer-info">
                                                <img src={order.freelancer.profile_picture ? order.freelancer.profile_picture : defaultImage} alt={order.freelancer.username ? order.freelancer.username : ""} />
                                            </div>
                                        </td>
                                        <td>
                                            <p>{order.freelancer.username ? order.freelancer.username : ""}</p>
                                        </td>
                                        <td>
                                            <div>
                                                {order.service.title}
                                            </div>
                                        </td>
                                        <td>{order.status}</td>
                                    </Link>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>}
        </div>
    )
}


function Orders() {

    const isFreelancer = Cookies.get('isFreelancer');

    return (
        <div className='orders'>
            {isFreelancer === 'true' ? <FreelancerOrders /> : <ClientOrders />}
        </div>
    )
}

export default Orders