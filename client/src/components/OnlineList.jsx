import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Friend } from './FriendsTab/Friend';
import { ProfileIcon } from './ProfileIcon';

const StyledOnlineList = styled.div`
    position: relative;

    width: 100%;
    height: 100vh;

    padding: 25px 10px;

    text-align: center;
    background-color: var(--maastricht-blue);
    img{
        user-select:none;
        pointer-events:none;

        position: absolute;
        translate: -50% -50%;
        top: 50%;
        left: 50%;

        width: 100px;
    }
`;

const OnlineList = ({ online }) => {
    const navigate = useNavigate();
    return (
        <StyledOnlineList>
            <h5>Active Friends</h5>

            {online.length < 1 &&
                <>
                    <h6>No one is here ...</h6>
                    <img src="/issue.svg" />
                </>
            }


            {online && online.map(friend => (
                <Friend key={friend._id} onClick={() => navigate(`/channels/@me/${friend._id}`)}>
                    <ProfileIcon avatar={friend.avatar} />
                    <p>{friend.username}</p>
                </Friend>
            ))}
        </StyledOnlineList>
    );
};

export default OnlineList;