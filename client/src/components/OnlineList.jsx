import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Friend } from './FriendsTab/Friend';
import { ProfileIcon } from './ProfileIcon';

const StyledOnlineList = styled.div`
    width: 100%;
    height: 100vh;

    padding: 25px 10px;

    text-align: center;
    background-color: var(--maastricht-blue);
`;

const OnlineList = ({ online }) => {
    const navigate = useNavigate();
    return (
        <StyledOnlineList>
            <p>Active Friends</p>

            {online.map(friend => (
                <Friend key={friend._id} onClick={() => navigate(`/channels/@me/${friend._id}`)}>
                    <ProfileIcon avatar={friend.avatar} />
                    <p>{friend.username}</p>
                </Friend>
            ))}
        </StyledOnlineList>
    );
};

export default OnlineList;