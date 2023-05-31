import defaultImage from '../../assets/images/default-user-image.png';
import './Message.css';

function SentMessage({ message, user }) {
    return (
        <div className='message__wrapper message-sent'>
            <div className='message__user message-sent'>
                <img src={user.profile_picture ? user.profile_picture : defaultImage} alt={user.username} />
            </div>
            <div className='message__container message-sent'>
                <p className='message__content message-sent'>{message.body}</p>
            </div>
        </div>
    )
}

export default SentMessage;