import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ServiceCardHorizontal from '../../components/service-card/ServiceCardHorizontal';
import SentMessage from '../../components/message/SentMessage';
import { useMutation } from '@apollo/client';
import './Order.css';

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
        }
    }
`;

function getService(data) {
    if (data) {
        const service = { ...data.orderById.service };
        service.freelancer = data.orderById.freelancer;
        return service;
    }
    return null;
}

function getConversation(conversation) {
    if (conversation)
        return conversation.messages.map(message => {
            <SentMessage message={message} />
        }
        )
    return null;
}

function Order() {

    const orderId = useParams().id;

    const { loading: loadingConversation, error: errorConversation, data: dataConversation } = useQuery(GET_CONVERSATION_BY_ORDER_ID, {
        variables: { orderId: orderId },
    }
    );

    const [sendMessage] = useMutation(SEND_MESSAGE);

    const { loading, error, data } = useQuery(GET_ORDER, {
        variables: { orderId: orderId },
    }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;
    if (data) console.log(data);

    return (
        data && (
            <div className='order__container col-xs-12 col-sm-12 col-md-8 col-lg-8'>
                <div className='order__header'>
                    <div className='order__header__title'>
                        <h1>Order</h1>
                        <h2 className='order__header__id'>#{data.orderById._id.slice(-6)}</h2>
                    </div>
                    <div className='order__header__status'>
                        <span class="material-symbols-outlined">
                            pending
                        </span>
                        <p>{data.orderById.status}</p>
                    </div>
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
                                    <p className='order__body__details__item__content'>{new Date(data.orderById.deadline).toLocaleDateString()}</p>
                                </div>
                                <div className='order__body__details__item'>
                                    <p className='order__body__details__item__title'>Price</p>
                                    <p className='order__body__details__item__content'>${data.orderById.price}</p>
                                </div>
                                <div className='order__body__details__item'>
                                    <p className='order__body__details__item__title'>Ordered on</p>
                                    <p className='order__body__details__item__content'>{new Date(data.orderById.date).toLocaleDateString()}</p>
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
                        <div className='order__actions'>
                            <button className='decline-order__button'>Decline</button>
                            <button className='accept-order__button'>Accept</button>
                        </div>
                    </div>
                    <div className='order__body__chat'>
                    </div>
                </div>
                <div className='order__chat'>
                    <div className='order__chat__container'>
                        <div className='order__chat__messages'>
                            {
                                dataConversation &&
                                getConversation(dataConversation.conversationByOrderId)
                            }
                        </div>
                    </div>
                    <div className='order__chat__input'>
                        <input type='text' placeholder='Type a message...' />
                        <button
                            onClick={
                                () => {
                                    sendMessage({
                                        variables: {
                                            // changes based on user state
                                            conversation: dataConversation.conversationByOrderId._id,
                                            sender: data.orderById.client._id,
                                            body: 'Hello'
                                        }
                                    }).then(res => console.log(res))
                                }
                            }
                            className='order__chat__send-button'>
                            <span class="material-symbols-outlined">
                                send
                            </span>
                        </button>
                    </div>
                </div>
            </div >
        )
    )
}

export default Order;