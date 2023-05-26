
import defaultImage from '../../assets/images/default-user-image.png';
import './SentMessage.css';

function SentMessage(props) {
    return (
        <div className='sent-message__wrapper'>
            <div className='sent-message__container'>
                <p className='sent-message__content'>{props.message.body}</p>
                {/* <p className='sent-message__date'>{new Date(message.date).toLocaleDateString()}</p> */}
            </div>
            <div className='sent-message__user'>
                <img src={props.message.sender.profile_picture ? props.message.sender.profile_picture : defaultImage} alt={props.message.sender.username} />
            </div>
        </div>
    )
}

export default SentMessage;