
function ReceivedMessage(message) {
    return (
        <div className='sent-message'>
            <div className='sent-message__user'>
                <img src={message.sender.profile_picture} alt={message.sender.username} />
                <p>{message.sender.username}</p>
            </div>
            <div className='sent-message__container'>
                <p className='sent-message__content'>{message.content}</p>
                <p className='sent-message__date'>{new Date(message.date).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

export default ReceivedMessage;