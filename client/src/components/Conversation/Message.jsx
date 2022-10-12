import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { lighten, cssVar } from 'polished';
import { ProfileIcon } from '../ProfileIcon';
import InviteEmbed from '../InviteEmbed';

const StyledMessage = styled.div`
    position: relative;
    display: flex;
    gap: 15px;
    padding: 8px 15px;

    width: 100%;

    color: var(--silver);
    font-size: 0.9rem;

    div{
        width: 100%;
    }
    .username {
        color: var(--lavender-blush);
        font-size: 0.9rem;
    }
    
    .icon {
        width: 40px;
        height: 40px;
    }

    &:hover {background-color: ${lighten(0.03, cssVar('--down-river'))};}
`;

const Message = ({ message, sender, receiver }) => {
    const isSender = sender._id === message.sender ? sender : receiver;
    const [inviteID, setInviteID] = useState(null);

    useEffect(() => {
        if (!message) return;
        if (message.content.includes(`${window.location.origin}/invite`)) {
            setInviteID(message.content.split('invite', -1)[1].substring(1));
        };
    }, [message]);

    return (
        <StyledMessage>
            <ProfileIcon className="icon" avatar={isSender.avatar} />
            <div>
                <p className="username">{isSender.username}</p>
                <p>{message.content}</p>
                {inviteID && <InviteEmbed inviteID={inviteID} />}
            </div>
        </StyledMessage>
    );
};

export default Message;
