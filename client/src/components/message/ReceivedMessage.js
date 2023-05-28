import defaultImage from '../../assets/images/default-user-image.png';
import './Message.css';

function ReceivedMessage({ message, user }) {
    return (
        <div className='message__wrapper message-received'>
            <div className='message__container message-received'>
                <p className='message__content message-received'>{message.body}</p>
            </div>
            <div className='message__user message-received'>
                <img src={user.profile_picture ? user.profile_picture : defaultImage} alt={user.username} />
            </div>
        </div>
    )
}

export default ReceivedMessage;