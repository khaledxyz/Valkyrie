import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';

const StyledInviteEmbed = styled.div`
    width: 100%;
    min-width: 200px;
    max-width: 400px;
    height: 100px;

    border-radius: var(--border-radius);
    padding: 5px 10px;
    background-color: var(--maastricht-blue);

    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const InviteEmbed = ({ inviteID }) => {
    const navigate = useNavigate();
    return (
        <StyledInviteEmbed>
            <p>You have been invited to join this server</p>
            <Button width={'100px'} onClick={() => navigate(`/invite/${inviteID}`)}>Join</Button>
        </StyledInviteEmbed>
    );
};

export default InviteEmbed;