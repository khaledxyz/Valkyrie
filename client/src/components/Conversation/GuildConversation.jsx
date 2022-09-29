// * DEPENDENCIES * //
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getGuild, getChannelMessages, createGuildMessage } from '../../features/guilds/guildsSlice';

// * COMPONENTS * //
import Input from '../Input/Input';
import GuildMessage from './GuildMessage';
import { RiHashtag } from 'react-icons/ri';

// * STYLES * //
import './Conversation.scss';

const GuildConversation = () => {
    const dispatch = useDispatch();
    const scrollRef = useRef();
    const inputRef = useRef();
    const { guildID, channelID } = useParams();

    const { messages } = useSelector((state) => state.guilds)
    const { members, channels } = useSelector((state) => state.guilds.currentGuild)
    const [messageContent, setMessageContent] = useState('');

    const channel = channels.find(channel => channel._id === channelID);

    useEffect(() => {
        dispatch(getGuild(guildID));
        dispatch(getChannelMessages(channelID));
        scrollToBottom();
        inputRef.current.focus();
    }, [guildID, channelID]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView();
    };

    return (
        <div className="Conversation">
            <div className="Conversation__Navbar">
                <p>#{channel.name}</p>
            </div>

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
                    placeholder={`Message #${channel.name}`}
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
