import { ProfileIcon } from '../ProfileIcon';

const Message = ({ message, sender, receiver }) => {
    const isSender = sender._id === message.sender ? sender : receiver;

    return (
        <div className="Message">
            <div className="message">
                <ProfileIcon className="icon" avatar={isSender.avatar} />
                <div className="message__content">
                    <p className="username">{isSender.username}</p>
                    <p>{message.content}</p>
                </div>
            </div>
        </div>
    );
};

export default Message;
