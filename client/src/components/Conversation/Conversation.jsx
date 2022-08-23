// * DEPENDENCIES * //
import { useState, useEffect, useRef, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import {
    getConversation,
    sendMessage
} from '../../features/conversations/conversationsSlice';

// * COMPONENTS * //
import Input from '../Input/Input';
import Message from './Message';

// * STYLES * //
import './Conversation.scss';

import { emitMessage } from '../../socket/socket';

const Conversation = ({ friendID }) => {
    const dispatch = useDispatch();

    const [messageContent, setMessageContent] = useState('');
    const [lastMessage, setLastMessage] = useState('');
    const scrollRef = useRef(null);
    const { currentConversation, updater } = useSelector(
        (state) => state.conversations
    );
    const { user } = useSelector((state) => state.auth);

    const receiver = currentConversation?.receiver;
    const sender = user.details;

    useEffect(() => {
        dispatch(getConversation(friendID));
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [currentConversation]);

    useEffect(() => {
        dispatch(getConversation(friendID));
    }, [lastMessage, updater]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!messageContent) return;

        const message = {
            content: messageContent,
            receiver: friendID
        };

        dispatch(sendMessage(message));
        emitMessage(message, sender);
        setLastMessage(message);
        setMessageContent('');
        scrollToBottom();
        e.target.reset();
    };

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView();
    };

    return (
        <div className="Conversation">
            <div className="Conversation__Navbar">
                <p>{receiver?.username}</p>
            </div>

            <div className="Conversation__messages">
                {currentConversation?.messages.map((message) => (
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
                    placeholder={`Message ${currentConversation?.receiver.username}`}
                    required={true}
                    onChange={(e) => setMessageContent(e.target.value)}
                    messageContent={messageContent}
                />
            </form>
        </div>
    );
};

export default Conversation;
