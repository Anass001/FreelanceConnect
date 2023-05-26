import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ServiceCardHorizontal from '../../components/service-card/ServiceCardHorizontal';
import SentMessage from '../../components/message/SentMessage';
import { useMutation } from '@apollo/client';
import './Order.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import ReceivedMessage from '../../components/message/ReceivedMessage';
import { formatDate } from '../../utils/FormatUtils';

const GET_ORDER = gql`
    query getOrder($orderId: ID!) {
        orderById(orderId: $orderId) {
            _id
            service {
                _id
                title
                description
                images
            }
            client {
                _id
                username
                profile_picture
            }
            freelancer {
                _id
                username
                profile_picture
            }
            status
            date
            deadline
            price
        }
    }
`;

const GET_CONVERSATION_BY_ORDER_ID = gql`
    query getConversationByOrderId($orderId: ID!) {
        conversationByOrderId(orderId: $orderId) {
            _id
            messages {
                _id
                body
                sender {
                    _id
                }
            }
            users {
                _id
                username
                profile_picture
            }
        }
    }
`;

const SEND_MESSAGE = gql`
    mutation sendMessage($conversation: ID!, $sender: ID!, $body: String!) {
        sendMessage(message: {conversation: $conversation, sender: $sender, body: $body}) {
            _id
            body
            sender {
                _id
            }
        }
    }
`;

const UPDATE_ORDER_STATUS = gql`
    mutation updateOrderStatus($orderId: ID!, $status: String!) {
        updateOrderStatus(orderId: $orderId, status: $status) {
            _id
        }
    }
`;

const MESSAGE_SUBSCRIPTION = gql`
    subscription messageSent($conversation: ID!) {
        messageSent(conversation: $conversation) {
            _id
            body
            sender {
                _id
            }
        }
    }
`;

function GetOrderStatus({ status }) {
    switch (status) {
        case 'pending':
            return (
                <div className='order__header__status'>
                    <span class="material-symbols-outlined">
                        pending
                    </span>
                    <p>PENDING</p>
                </div>
            );
        case 'in_progress':
            return (
                <div className='order__header__status order__status__in-progress'>
                    <span class="material-symbols-outlined">
                        sync
                    </span>
                    <p>IN PROGRESS</p>
                </div>
            );
        case 'declined':
            return (
                <div className='order__header__status order__status__declined'>
                    <span class="material-symbols-outlined">
                        cancel
                    </span>
                    <p>DECLINED</p>
                </div>
            );
        case 'completed':
            return (
                <div className='order__header__status order__status__completed'>
                    <span class="material-symbols-outlined">
                        check_circle
                    </span>
                    <p>COMPLETED</p>
                </div>
            );
        case 'closed':
            return (
                <div className='order__header__status order__status__closed'>
                    <span class="material-symbols-outlined">
                        check_circle
                    </span>
                    <p>CLOSED</p>
                </div>
            );
        case 'cancelled':
            return (
                <div className='order__header__status order__status__cancelled'>
                    <span class="material-symbols-outlined">
                        cancel
                    </span>
                    <p>CANCELLED</p>
                </div>
            );
        default:
            return (
                <div className='order__header__status'>
                    <span class="material-symbols-outlined">
                        pending
                    </span>
                    <p>PENDING</p>
                </div>
            );
    }
}

function GetOrderActions({ status, updateOrderStatus, orderId }) {
    switch (status) {
        case 'pending':
            return (
                <div className='order__actions'>
                    <button
                        onClick={() => {
                            updateOrderStatus({ variables: { orderId: orderId, status: 'DECLINED' } })
                                .then(() => {
                                    window.location.reload();
                                });
                        }}
                        className='order__button decline-order__button'>Decline</button>
                    <button
                        onClick={() => {
                            updateOrderStatus({ variables: { orderId: orderId, status: 'IN_PROGRESS' } })
                                .then(() => {
                                    window.location.reload();
                                });
                        }}
                        className='order__button accept-order__button'>Accept</button>
                </div>
            );
        case 'in_progress':
            return (
                <div className='order__actions'>
                    <button
                        onClick={() => {
                            updateOrderStatus({ variables: { orderId: orderId, status: 'CANCELLED' } })
                                .then(() => {
                                    window.location.reload();
                                });
                        }}
                        className='order__button cancel-order__button'>Cancel</button>
                    <button
                        onClick={() => {
                            updateOrderStatus({ variables: { orderId: orderId, status: 'COMPLETED' } })
                                .then(() => {
                                    window.location.reload();
                                });
                        }}
                        className='order__button complete-order__button'>Mark as completed</button>
                </div>
            );
        default:
            return (
                <div className='order__actions'>
                </div>
            );
    }
}

function getService(data) {
    if (data) {
        const service = { ...data.orderById.service };
        service.freelancer = data.orderById.freelancer;
        return service;
    }
    return null;
}

function Order() {

    const orderId = useParams().id;

    const userId = Cookies.get('userId');

    const [message, setMessage] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const { loading: loadingConversation, error: errorConversation, data: dataConversation } = useQuery(GET_CONVERSATION_BY_ORDER_ID, {
        variables: { orderId: orderId },
    }
    );

    const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);

    const [sendMessage, {
        loading: loadingSendMessage,
        error: errorSendMessage,
        data: dataSendMessage
    }] = useMutation(SEND_MESSAGE);

    const { loading, error, data } = useQuery(GET_ORDER, {
        variables: { orderId: orderId },
    }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

    return (
        data && (
            <div className='order__container col-xs-12 col-sm-12 col-md-8 col-lg-8'>
                <div className='order__header'>
                    <div className='order__header__title'>
                        <h1>Order</h1>
                        <h2 className='order__header__id'>#{data.orderById._id.slice(-6)}</h2>
                    </div>
                    <GetOrderStatus status={
                        data.orderById.status.toLowerCase()
                    } />
                </div>
                <div className='order__body'>
                    <div className='order__body__service'>
                        <div className='order__body__client'>
                        </div>
                        <ServiceCardHorizontal service={getService(data)} />
                    </div>
                    <div className='order__body__details'>
                        <h2>Details</h2>
                        <div className='order__body__details__container'>
                            <div className='order__body__details__info'>
                                <div className='order__body__details__item'>
                                    <p className='order__body__details__item__title'>Client</p>
                                    <p className='order__body__details__item__content'>{data.orderById.client.username}</p>
                                </div>
                                <div className='order__body__details__item'>
                                    <p className='order__body__details__item__title'>Deadline</p>
                                    <p className='order__body__details__item__content'>{
                                        formatDate(new Date(data.orderById.deadline))
                                    }</p>
                                </div>
                                <div className='order__body__details__item'>
                                    <p className='order__body__details__item__title'>Price</p>
                                    <p className='order__body__details__item__content'>${data.orderById.price}</p>
                                </div>
                                <div className='order__body__details__item'>
                                    <p className='order__body__details__item__title'>Ordered on</p>
                                    <p className='order__body__details__item__content'>{
                                        formatDate(new Date(data.orderById.date))
                                    }</p>
                                </div>
                            </div>
                            <div className='order__body__details__description'>
                                <div className='order__body__details__item'>
                                    <p className='order__body__details__item__title'>Comment</p>
                                    <p className='order__body__details__item__content'>{
                                        data.orderById.service.description
                                    }</p>
                                </div>
                            </div>
                        </div>
                        <GetOrderActions status={
                            data.orderById.status.toLowerCase()
                        }
                            updateOrderStatus={
                                updateOrderStatus
                            }
                            orderId={
                                data.orderById._id
                            } />
                    </div>
                    <div className='order__body__chat'>
                    </div>
                </div>
                <div className='order__chat'>
                    <div className='order__chat__container'>
                        <div className='order__chat__messages'>
                            <div className='order__chat__messages__container'>
                                {
                                    dataConversation &&
                                    dataConversation
                                        .conversationByOrderId
                                        .messages
                                        .map(message =>
                                            message.sender._id === userId ?
                                                <SentMessage message={message} />
                                                :
                                                <ReceivedMessage message={message} />
                                        )
                                }
                            </div>
                        </div>
                    </div>
                    {(data.orderById.status.toLowerCase() === 'in_progress' || data.orderById.status.toLowerCase() === 'pending') &&
                        <div className='order__chat__input'>
                            <input
                                onChange={handleMessageChange}
                                value={message}
                                type='text' placeholder='Type a message...' />
                            <button
                                onClick={
                                    () => {
                                        sendMessage({
                                            variables: {
                                                conversation: dataConversation.conversationByOrderId._id,
                                                sender: '64588c572d6032dd97162aa6',
                                                body: message
                                            }
                                        });
                                    }
                                }
                                className='order__chat__send-button'>
                                <span class="material-symbols-outlined">
                                    send
                                </span>
                            </button>
                        </div>
                    }
                </div>
            </div >
        )
    )
}

export default Order;