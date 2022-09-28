import { ProfileIcon } from '../ProfileIcon';

const GuildMessage = ({ message, members }) => {
    const sender = members?.filter(member => member._id === message.sender);
    return (
        <div className="Message">
            <div className="message">
                <ProfileIcon className="icon" avatar={sender && sender[0].avatar} />
                <div className="message__content">
                    <p className="username">{sender && sender[0].username}</p>
                    <p>{message.content}</p>
                </div>
            </div>
        </div>
    );
};

export default GuildMessage;
