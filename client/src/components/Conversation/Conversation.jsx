// * DEPENDENCIES * //
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getConversation, sendMessage } from '../../features/conversations/conversationsSlice';

// * COMPONENTS * //
import Input from '../Input/Input';
import { ProfileIcon } from '../ProfileIcon';

// * STYLES * //
import './Conversation.scss';

const Conversation = ({ friendID }) => {
    const dispatch = useDispatch();

    const [messageContent, setMessageContent] = useState('');
    const { currentConversation } = useSelector(state => state.conversations);
    const { user } = useSelector(state => state.auth);

    const receiver = currentConversation?.receiver;
    const sender = user.details;

    useEffect(() => {
        dispatch(getConversation(friendID));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = {
            content: messageContent,
            receiver: friendID
        };

        dispatch(sendMessage(message));
        setMessageContent('');
        socket.emit('sendMessage', 'hello');
    };

    return (
        <div className="Conversation">
            <div className='Conversation__Navbar'>
                <p>{receiver?.username}</p>
            </div>

            <div className="Conversation__messages">{
                currentConversation?.messages.map(message => (
                    <div className="message" key={message._id}>
                        <ProfileIcon className='icon' />
                        <div className="message__content">
                            <p className='username'>{message.sender == sender._id ? sender.username : receiver?.username}</p>
                            {message.content}
                        </div>
                    </div>
                ))
            }</div>

            <form className='Conversation__Footer' onSubmit={(e) => handleSubmit(e)}>
                <Input
                    type={'text'}
                    placeholder={`Message ${currentConversation?.receiver.username}`}
                    required={true}
                    onChange={e => setMessageContent(e.target.value)}
                    messageContent={messageContent}
                />
            </form>
        </div>
    );
}

export default Conversation;