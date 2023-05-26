import React from 'react';
import defaultImage from '../../assets/images/default-user-image.png';

function ReceivedMessage(props) {
    return (
        <div className='received-message__wrapper'>
            <div className='sent-message__user'>
            <img src={props.message.sender.profile_picture ? props.message.sender.profile_picture : defaultImage} alt={props.message.sender.username} />
            </div>
            <div className='sent-message__container'>
                <p className='sent-message__content'>{props.smessage.content}</p>
                {/* <p className='sent-message__date'>{new Date(message.date).toLocaleDateString()}</p> */}
            </div>
        </div>
    )
}

export default ReceivedMessage;