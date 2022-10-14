// * DEPENDENCIES * //
import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getConversation, sendMessage, updater } from '../../features/conversation/conversationSlice';
import { SocketContext, socket } from '../../context/SocketContext';

// * COMPONENTS * //
import Input from '../Input/Input';
import Message from './Message';
import ConversationNavbar from '../ConversationNavbar';

// * STYLES * //
import './Conversation.scss';

const Conversation = () => {
    const { friendID } = useParams();
    const dispatch = useDispatch();
    const scrollRef = useRef(null);

    const [messageContent, setMessageContent] = useState('');
    const [roomID, setRoomID] = useState('');
    const socket = useContext(SocketContext);
    const { messages, receiver } = useSelector(state => state.conversation);
    const sender = useSelector(state => state.auth.user.details);

    useEffect(() => {
        socket.emit('join_dm', sender._id, friendID);
        socket.on('joined_dm', roomID => setRoomID(roomID));
        socket.on('received_message', (message) => { dispatch(updater(message)) });

        return () => {
            socket.off('joined_dm');
            socket.off('received_message');
        };
    }, [friendID, sender]);

    useEffect(() => {
        dispatch(getConversation(friendID));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
            content: messageContent,
            receiver: friendID,
        };

        dispatch(sendMessage({ message, roomID }));
        setMessageContent('');
        scrollToBottom();
        e.target.reset();
    };

    const scrollToBottom = () => { scrollRef.current?.scrollIntoView(); };
    useEffect(() => { scrollToBottom(); }, [messages]);

    return (
        <div className="Conversation">
            <ConversationNavbar>
                <p>{receiver?.username}</p>
            </ConversationNavbar>

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
