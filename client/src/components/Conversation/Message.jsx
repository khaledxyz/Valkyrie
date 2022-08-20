import { ProfileIcon } from '../ProfileIcon';

const Message = ({ message, sender, receiver }) => {
    const isSender =
        sender._id === message.sender ? sender.username : receiver.username;

    return (
        <div className="Message">
            <div className="message">
                <ProfileIcon className="icon" />
                <div className="message__content">
                    <p className="username">{isSender}</p>
                    <p>{message.content}</p>
                </div>
            </div>
        </div>
    );
};

export default Message;
