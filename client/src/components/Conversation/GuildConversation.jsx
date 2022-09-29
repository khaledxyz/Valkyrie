// * DEPENDENCIES * //
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// * REDUX SLICE * //
import { getGuild, getChannelMessages, createGuildMessage } from '../../features/guilds/guildsSlice';

// * COMPONENTS * //
import Input from '../Input/Input';
import GuildMessage from './GuildMessage';

// * STYLES * //
import './Conversation.scss';

const GuildConversation = () => {
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const { guildID, channelID } = useParams();

    const { messages } = useSelector((state) => state.guilds)
    const { members } = useSelector((state) => state.guilds.currentGuild)
    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {
        dispatch(getGuild(guildID));
        dispatch(getChannelMessages(channelID));
        scrollToBottom();
    }, [guildID, channelID, messages]);

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
                <p>ChannelName</p>
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
                    placeholder={`Message ChannelName`}
                    required={true}
                    onChange={(e) => setMessageContent(e.target.value)}
                    messageContent={messageContent}
                />
            </form>
        </div>
    );
};

export default GuildConversation;
