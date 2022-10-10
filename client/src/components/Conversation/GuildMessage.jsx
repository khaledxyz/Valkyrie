import styled from 'styled-components';
import { lighten, cssVar } from 'polished';
import { ProfileIcon } from '../ProfileIcon';

const StyledMessage = styled.div`
    display: flex;
    gap: 15px;
    padding: 8px 15px;

    width: 100%;

    color: var(--silver);
    font-size: 0.9rem;

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

const GuildMessage = ({ message, members }) => {
    const sender = members?.filter(member => member._id === message.sender);
    return (
        <StyledMessage>
            <ProfileIcon className="icon" avatar={sender && sender[0].avatar} />
            <div className="message__content">
                <p className="username">{sender && sender[0].username}</p>
                <p>{message.content}</p>
            </div>
        </StyledMessage>
    );
};

export default GuildMessage;
