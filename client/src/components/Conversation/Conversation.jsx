// * DEPENDENCIES * //
import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getConversation, sendMessage } from '../../features/conversation/conversationSlice';

// * COMPONENTS * //
import Input from '../Input/Input';
import Message from './Message';

// * STYLES * //
import './Conversation.scss';

const Conversation = () => {
    const { friendID } = useParams();
    const dispatch = useDispatch();
    const scrollRef = useRef(null);

    const [messageContent, setMessageContent] = useState('');

    const { messages, receiver } = useSelector(state => state.conversation);

    useEffect(() => {
        dispatch(getConversation(friendID));
        joinChat();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            content: messageContent,
            receiver: friendID,
            room
        };

        dispatch(sendMessage(message));
        setMessageContent('');
        scrollToBottom();
        e.target.reset();
    };

    const scrollToBottom = () => { scrollRef.current?.scrollIntoView(); };
    useEffect(() => { scrollToBottom(); }, [messages]);

    return (
        <div className="Conversation">
            <div className="Conversation__Navbar">
                <p>{receiver?.username}</p>
            </div>

            <div className="Conversation__messages">
                {messages?.map((message) => (
                    <Message
                        message={message}
                        key={message._id}
                        receiver={receiver}
                        sender={sender}
                    />
                ))}
                <div ref={scrollRef}></div>
            </div>

            <form
                className="Conversation__Footer"
                onSubmit={(e) => handleSubmit(e)}
            >
                <Input
                    type={'text'}
                    placeholder={`Message ${receiver?.username}`}
                    required={true}
                    onChange={(e) => setMessageContent(e.target.value)}
                    messageContent={messageContent}
                />
            </form>
        </div>
    );
};

export default Conversation;
