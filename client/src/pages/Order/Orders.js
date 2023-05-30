import React, { useContext } from 'react';
import './Orders.css';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Cookies from 'js-cookie';
import defaultImage from '../../assets/images/default-user-image.png';
import UserContext from '../../UserContext';

const GET_ORDERS_BY_CLIENT_ID = `
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

function Orders() {

    const navigate = useNavigate();

    const userId = useContext(UserContext).userId

    const { loading: ordersLoading, error: ordersError, data: ordersData } = useQuery(gql(GET_ORDERS_BY_CLIENT_ID), {
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
            </div>
            }
        </div >
    )
}

export default Orders