// * DEPENDENCIES * //
import { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getGuild, getChannelMessages, createGuildMessage, updater } from '../../features/guilds/guildsSlice';
import { SocketContext, socket } from '../../context/SocketContext';

// * COMPONENTS * //
import Input from '../Input/Input';
import GuildMessage from './GuildMessage';
import ConversationNavbar from '../ConversationNavbar';

// * STYLES * //
import './Conversation.scss';

const GuildConversation = () => {
    const dispatch = useDispatch();
    const scrollRef = useRef();
    const inputRef = useRef();
    const { guildID, channelID } = useParams();

    const socket = useContext(SocketContext);
    const { messages } = useSelector((state) => state.guilds);
    const { members, channels } = useSelector((state) => state.guilds.currentGuild);
    const [messageContent, setMessageContent] = useState('');

    const channel = channels?.find(channel => channel._id === channelID);

    useEffect(() => {
        socket.emit('join_channel', channelID);

        socket.on('joined_channel', () => console.log('joined channel'));
        socket.on('received_message', message => dispatch(updater(message)));

        dispatch(getGuild(guildID));
        dispatch(getChannelMessages(channelID));
        scrollToBottom();
        inputRef.current.focus();

        return () => {
            socket.off('joined_channel');
            socket.off('received_message');
        };
    }, [guildID, channelID]);


    useEffect(() => { scrollToBottom() }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!messageContent) return;

        const message = {
            channelID,
            content: messageContent,
        }

        dispatch(createGuildMessage(message));
        setMessageContent('');
        scrollToBottom();
        e.target.reset();
    };

    const scrollToBottom = () => { scrollRef.current?.scrollIntoView(); };

    return (
        <div className="Conversation">
            <ConversationNavbar>
                <p>#{channel?.name}</p>
            </ConversationNavbar>

            <div className="Conversation__messages">
                {messages?.map((message) => (
                    <GuildMessage
                        message={message}
                        members={members}
                        key={message._id}
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
                    placeholder={`Message #${channel?.name}`}
                    required={true}
                    onChange={(e) => setMessageContent(e.target.value)}
                    messageContent={messageContent}
                    inputRef={inputRef}
                />
            </form>
        </div>
    );
};

export default GuildConversation;
